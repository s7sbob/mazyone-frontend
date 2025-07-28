const { getPool, sql } = require('../config/database');
const { generateUUID, sanitizeString, createSlug } = require('../utils/helpers');

class CVController {
  // إنشاء سيرة ذاتية جديدة
  static async createCV(req, res) {
    try {
      const {
        title,
        template = 'professional',
        personalInfo,
        summary,
        experience,
        education,
        skills,
        languages,
        certifications,
        projects,
        references,
        customSections
      } = req.body;

      const pool = getPool();
      const cvId = generateUUID();
      const shareUrl = `${process.env.CLIENT_URL}/cv/${cvId}`;

      await pool
        .request()
        .input('id', sql.UniqueIdentifier, cvId)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('title', sql.NVarChar, sanitizeString(title))
        .input('template', sql.NVarChar, template)
        .input('personalInfo', sql.NVarChar, JSON.stringify(personalInfo || {}))
        .input('summary', sql.NVarChar, summary || '')
        .input('experience', sql.NVarChar, JSON.stringify(experience || []))
        .input('education', sql.NVarChar, JSON.stringify(education || []))
        .input('skills', sql.NVarChar, JSON.stringify(skills || []))
        .input('languages', sql.NVarChar, JSON.stringify(languages || []))
        .input('certifications', sql.NVarChar, JSON.stringify(certifications || []))
        .input('projects', sql.NVarChar, JSON.stringify(projects || []))
        .input('references', sql.NVarChar, JSON.stringify(references || []))
        .input('customSections', sql.NVarChar, JSON.stringify(customSections || []))
        .input('shareUrl', sql.NVarChar, shareUrl)
        .query(`
          INSERT INTO CVs (
            Id, UserId, Title, Template, PersonalInfo, Summary,
            Experience, Education, Skills, Languages, Certifications,
            Projects, References, CustomSections, IsPublic, Views,
            Downloads, ShareUrl, CreatedAt, UpdatedAt
          )
          VALUES (
            @id, @userId, @title, @template, @personalInfo, @summary,
            @experience, @education, @skills, @languages, @certifications,
            @projects, @references, @customSections, 0, 0, 0,
            @shareUrl, GETDATE(), GETDATE()
          )
        `);

      // جلب السيرة الذاتية المُنشأة
      const result = await pool
        .request()
        .input('cvId', sql.UniqueIdentifier, cvId)
        .query(`
          SELECT 
            Id, Title, Template, PersonalInfo, Summary, Experience,
            Education, Skills, Languages, Certifications, Projects,
            References, CustomSections, IsPublic, Views, Downloads,
            ShareUrl, CreatedAt, UpdatedAt
          FROM CVs 
          WHERE Id = @cvId
        `);

      const cv = result.recordset[0];
      cv.PersonalInfo = JSON.parse(cv.PersonalInfo);
      cv.Experience = JSON.parse(cv.Experience);
      cv.Education = JSON.parse(cv.Education);
      cv.Skills = JSON.parse(cv.Skills);
      cv.Languages = JSON.parse(cv.Languages);
      cv.Certifications = JSON.parse(cv.Certifications);
      cv.Projects = JSON.parse(cv.Projects);
      cv.References = JSON.parse(cv.References);
      cv.CustomSections = JSON.parse(cv.CustomSections);

      res.status(201).json({
        success: true,
        message: 'تم إنشاء السيرة الذاتية بنجاح',
        data: { cv }
      });

    } catch (error) {
      console.error('Create CV error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في إنشاء السيرة الذاتية'
      });
    }
  }

  // الحصول على جميع السير الذاتية للمستخدم
  static async getUserCVs(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const pool = getPool();

      const result = await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('offset', sql.Int, offset)
        .input('limit', sql.Int, parseInt(limit))
        .query(`
          SELECT 
            Id, Title, Template, IsPublic, Views, Downloads,
            ShareUrl, CreatedAt, UpdatedAt,
            COUNT(*) OVER() as TotalCount
          FROM CVs
          WHERE UserId = @userId
          ORDER BY CreatedAt DESC
          OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
        `);

      const cvs = result.recordset;
      const totalCount = result.recordset.length > 0 ? result.recordset[0].TotalCount : 0;

      res.json({
        success: true,
        data: {
          cvs,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
            hasNext: page * limit < totalCount,
            hasPrev: page > 1
          }
        }
      });

    } catch (error) {
      console.error('Get user CVs error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب السير الذاتية'
      });
    }
  }

  // تحديث السيرة الذاتية
  static async updateCV(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const pool = getPool();

      // التحقق من ملكية السيرة الذاتية
      const ownerCheck = await pool
        .request()
        .input('cvId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT Id FROM CVs WHERE Id = @cvId AND UserId = @userId');

      if (ownerCheck.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'السيرة الذاتية غير موجودة أو غير مملوكة لك'
        });
      }

      // بناء استعلام التحديث
      const fieldsToUpdate = [];
      const request = pool.request().input('cvId', sql.UniqueIdentifier, id);

      const allowedFields = [
        'title', 'template', 'personalInfo', 'summary', 'experience',
        'education', 'skills', 'languages', 'certifications', 'projects',
        'references', 'customSections', 'isPublic'
      ];

      allowedFields.forEach(field => {
        if (updateData.hasOwnProperty(field)) {
          const dbField = field.charAt(0).toUpperCase() + field.slice(1);
          if (field === 'isPublic') {
            fieldsToUpdate.push(`IsPublic = @${field}`);
            request.input(field, sql.Bit, updateData[field]);
          } else if (typeof updateData[field] === 'object') {
            fieldsToUpdate.push(`${dbField} = @${field}`);
            request.input(field, sql.NVarChar, JSON.stringify(updateData[field]));
          } else {
            fieldsToUpdate.push(`${dbField} = @${field}`);
            request.input(field, sql.NVarChar, updateData[field]);
          }
        }
      });

      if (fieldsToUpdate.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'لا توجد بيانات للتحديث'
        });
      }

      await request.query(`
        UPDATE CVs 
        SET ${fieldsToUpdate.join(', ')}, UpdatedAt = GETDATE()
        WHERE Id = @cvId
      `);

      // جلب السيرة الذاتية المحدثة
      const result = await pool
        .request()
        .input('cvId', sql.UniqueIdentifier, id)
        .query(`
          SELECT 
            Id, Title, Template, PersonalInfo, Summary, Experience,
            Education, Skills, Languages, Certifications, Projects,
            References, CustomSections, IsPublic, Views, Downloads,
            ShareUrl, CreatedAt, UpdatedAt
          FROM CVs 
          WHERE Id = @cvId
        `);

      const cv = result.recordset[0];
      // تحويل JSON strings إلى objects
      ['PersonalInfo', 'Experience', 'Education', 'Skills', 'Languages', 
       'Certifications', 'Projects', 'References', 'CustomSections'].forEach(field => {
        if (cv[field]) {
          cv[field] = JSON.parse(cv[field]);
        }
      });

      res.json({
        success: true,
        message: 'تم تحديث السيرة الذاتية بنجاح',
        data: { cv }
      });

    } catch (error) {
      console.error('Update CV error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تحديث السيرة الذاتية'
      });
    }
  }

  // حذف السيرة الذاتية
  static async deleteCV(req, res) {
    try {
      const { id } = req.params;
      const pool = getPool();

      // التحقق من ملكية السيرة الذاتية
      const result = await pool
        .request()
        .input('cvId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT Id FROM CVs WHERE Id = @cvId AND UserId = @userId');

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'السيرة الذاتية غير موجودة أو غير مملوكة لك'
        });
      }

      // حذف السيرة الذاتية
      await pool
        .request()
        .input('cvId', sql.UniqueIdentifier, id)
        .query('DELETE FROM CVs WHERE Id = @cvId');

      res.json({
        success: true,
        message: 'تم حذف السيرة الذاتية بنجاح'
      });

    } catch (error) {
      console.error('Delete CV error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف السيرة الذاتية'
      });
    }
  }

  // عرض السيرة الذاتية العامة
  static async getPublicCV(req, res) {
    try {
      const { id } = req.params;
      const { trackView = false } = req.query;
      const pool = getPool();

      const result = await pool
        .request()
        .input('cvId', sql.UniqueIdentifier, id)
        .query(`
          SELECT 
            Id, Title, Template, PersonalInfo, Summary, Experience,
            Education, Skills, Languages, Certifications, Projects,
            References, CustomSections, Views, Downloads, CreatedAt
          FROM CVs 
          WHERE Id = @cvId AND IsPublic = 1
        `);

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'السيرة الذاتية غير موجودة أو غير عامة'
        });
      }

      const cv = result.recordset[0];
      
      // تحويل JSON strings إلى objects
      ['PersonalInfo', 'Experience', 'Education', 'Skills', 'Languages', 
       'Certifications', 'Projects', 'References', 'CustomSections'].forEach(field => {
        if (cv[field]) {
          cv[field] = JSON.parse(cv[field]);
        }
      });

      // تتبع المشاهدة
      if (trackView === 'true') {
        await pool
          .request()
          .input('cvId', sql.UniqueIdentifier, id)
          .query('UPDATE CVs SET Views = Views + 1 WHERE Id = @cvId');

        cv.Views += 1;
      }

      res.json({
        success: true,
        data: { cv }
      });

    } catch (error) {
      console.error('Get public CV error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب السيرة الذاتية'
      });
    }
  }

  // الحصول على قوالب السير الذاتية
  static async getTemplates(req, res) {
    try {
      const templates = {
        professional: {
          id: 'professional',
          name: 'احترافي',
          description: 'تصميم كلاسيكي مناسب لجميع المجالات',
          preview: '/templates/professional-preview.jpg',
          features: ['تصميم نظيف', 'سهل القراءة', 'مناسب للطباعة']
        },
        modern: {
          id: 'modern',
          name: 'عصري',
          description: 'تصميم حديث مع ألوان جذابة',
          preview: '/templates/modern-preview.jpg',
          features: ['تصميم حديث', 'ألوان متنوعة', 'قوالب مرنة']
        },
        creative: {
          id: 'creative',
          name: 'إبداعي',
          description: 'مناسب للمجالات الإبداعية والتصميم',
          preview: '/templates/creative-preview.jpg',
          features: ['تصميم فني', 'عرض الأعمال', 'مناسب للمبدعين']
        },
        minimal: {
          id: 'minimal',
          name: 'بسيط',
          description: 'تصميم مبسط يركز على المحتوى',
          preview: '/templates/minimal-preview.jpg',
          features: ['تصميم بسيط', 'تركيز على المحتوى', 'سرعة في التحميل']
        },
        executive: {
          id: 'executive',
          name: 'تنفيذي',
          description: 'مناسب للمناصب الإدارية العليا',
          preview: '/templates/executive-preview.jpg',
          features: ['مظهر راقي', 'مناسب للإدارة', 'احترافية عالية']
        }
      };

      res.json({
        success: true,
        data: { templates }
      });

    } catch (error) {
      console.error('Get CV templates error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب قوالب السير الذاتية'
      });
    }
  }
}

module.exports = CVController;
