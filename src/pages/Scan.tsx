import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  QrCode, 
  Smartphone,
  X,
  CheckCircle,
  AlertCircle,
  Download,
  Share2
} from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';

const Scan = () => {
  const { addContact } = useStore();
  const [scanMode, setScanMode] = useState<'camera' | 'upload' | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  const startCameraScanning = () => {
    setScanMode('camera');
    setIsScanning(true);

    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      },
      false
    );

    scanner.render(
      (decodedText) => {
        handleScanSuccess(decodedText);
        scanner.clear();
        setIsScanning(false);
      },
      (error) => {
        console.log('Scan error:', error);
      }
    );

    scannerRef.current = scanner;
  };

  const handleScanSuccess = (decodedText: string) => {
    setScanResult(decodedText);
    
    // محاولة تحليل البيانات
    try {
      if (decodedText.startsWith('BEGIN:VCARD')) {
        // تحليل vCard
        const vCardData = parseVCard(decodedText);
        setScannedData(vCardData);
        toast.success('تم مسح بطاقة الاتصال بنجاح!');
      } else if (decodedText.startsWith('http')) {
        // رابط ويب
        setScannedData({ type: 'url', url: decodedText });
        toast.success('تم مسح الرابط بنجاح!');
      } else {
        // نص عادي
        setScannedData({ type: 'text', content: decodedText });
        toast.success('تم المسح بنجاح!');
      }
    } catch (error) {
      toast.error('حدث خطأ في تحليل البيانات');
    }
  };

  const parseVCard = (vCardText: string) => {
    const lines = vCardText.split('\n');
    const data: any = { type: 'vcard' };

    lines.forEach(line => {
      if (line.startsWith('FN:')) {
        data.name = line.substring(3);
      } else if (line.startsWith('TEL:')) {
        data.phone = line.substring(4);
      } else if (line.startsWith('EMAIL:')) {
        data.email = line.substring(6);
      } else if (line.startsWith('ORG:')) {
        data.company = line.substring(4);
      } else if (line.startsWith('URL:')) {
        data.website = line.substring(4);
      }
    });

    return data;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setScanMode('upload');
    
    // هنا يمكن إضافة مكتبة لقراءة QR من الصورة
toast('ميزة رفع الصور قيد التطوير', {
  icon: 'ℹ️',
  style: {
    background: '#3B82F6',
    color: '#FFFFFF',
  },
});  };

  const saveContact = () => {
    if (scannedData && scannedData.type === 'vcard') {
      addContact({
          name: scannedData.name || 'جهة اتصال جديدة',
          email: scannedData.email,
          phone: scannedData.phone,
          company: scannedData.company,
          source: 'qr',
          tags: ['مسح ضوئي'],
          updatedAt: '',
          interactionCount: 0
      });
      
      toast.success('تم حفظ جهة الاتصال بنجاح!');
      resetScan();
    }
  };

  const resetScan = () => {
    setScanMode(null);
    setScanResult(null);
    setScannedData(null);
    setIsScanning(false);
    
    if (scannerRef.current) {
      scannerRef.current.clear();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          مسح رموز QR والبطاقات
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          امسح رمز QR أو ارفع صورة لاستخراج المعلومات
        </p>
      </div>

      {!scanMode && !scanResult && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Camera Scan */}
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              مسح بالكاميرا
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              استخدم كاميرا الجهاز لمسح رمز QR مباشرة
            </p>
            <button
              onClick={startCameraScanning}
              className="btn-primary w-full"
            >
              بدء المسح
            </button>
          </div>

          {/* Upload Image */}
          <div className="card text-center">
            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-secondary-500" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              رفع صورة
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              ارفع صورة تحتوي على رمز QR لاستخراج المعلومات
            </p>
            <label className="btn-secondary w-full cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              اختر صورة
            </label>
          </div>
        </div>
      )}

      {/* Camera Scanner */}
      {scanMode === 'camera' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              مسح رمز QR
            </h3>
            <button
              onClick={resetScan}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div id="qr-reader" className="w-full"></div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              وجه الكاميرا نحو رمز QR للمسح التلقائي
            </p>
          </div>
        </div>
      )}

      {/* Scan Results */}
      {scanResult && scannedData && (
        <div className="card">
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              تم المسح بنجاح
            </h3>
          </div>

          {scannedData.type === 'vcard' && (
            <div className="space-y-4">
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                  معلومات جهة الاتصال
                </h4>
                <div className="space-y-2">
                  {scannedData.name && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">الاسم:</span>
                      <span className="text-neutral-900 dark:text-neutral-100">{scannedData.name}</span>
                    </div>
                  )}
                  {scannedData.phone && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">الهاتف:</span>
                      <span className="text-neutral-900 dark:text-neutral-100">{scannedData.phone}</span>
                    </div>
                  )}
                  {scannedData.email && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">البريد:</span>
                      <span className="text-neutral-900 dark:text-neutral-100">{scannedData.email}</span>
                    </div>
                  )}
                  {scannedData.company && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">الشركة:</span>
                      <span className="text-neutral-900 dark:text-neutral-100">{scannedData.company}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-3 space-x-reverse">
                <button
                  onClick={saveContact}
                  className="btn-primary flex items-center space-x-2 space-x-reverse"
                >
                  <Download className="w-4 h-4" />
                  <span>حفظ جهة الاتصال</span>
                </button>
                <button
                  onClick={resetScan}
                  className="btn-secondary"
                >
                  مسح جديد
                </button>
              </div>
            </div>
          )}

          {scannedData.type === 'url' && (
            <div className="space-y-4">
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                  رابط ويب
                </h4>
                <p className="text-neutral-700 dark:text-neutral-300 break-all">
                  {scannedData.url}
                </p>
              </div>

              <div className="flex space-x-3 space-x-reverse">
                <a
                  href={scannedData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center space-x-2 space-x-reverse"
                >
                  <Share2 className="w-4 h-4" />
                  <span>فتح الرابط</span>
                </a>
                <button
                  onClick={resetScan}
                  className="btn-secondary"
                >
                  مسح جديد
                </button>
              </div>
            </div>
          )}

          {scannedData.type === 'text' && (
            <div className="space-y-4">
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                  النص المستخرج
                </h4>
                <p className="text-neutral-700 dark:text-neutral-300">
                  {scannedData.content}
                </p>
              </div>

              <button
                onClick={resetScan}
                className="btn-primary"
              >
                مسح جديد
              </button>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          تعليمات الاستخدام
        </h3>
        <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-start space-x-3 space-x-reverse">
            <QrCode className="w-5 h-5 text-primary-500 mt-0.5" />
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">رموز QR المدعومة:</p>
              <p>بطاقات الاتصال (vCard)، روابط المواقع، النصوص العادية</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 space-x-reverse">
            <Smartphone className="w-5 h-5 text-secondary-500 mt-0.5" />
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">نصائح للمسح:</p>
              <p>تأكد من وضوح الرمز وإضاءة كافية، وحافظ على ثبات الجهاز</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
