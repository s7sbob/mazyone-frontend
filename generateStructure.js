import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const structure = {
  'mazyone-backend': {
    src: {
      config: ['database.js', 'jwt.js', 'constants.js'],
      middleware: ['auth.js', 'validation.js', 'rateLimiter.js', 'upload.js'],
      models: ['User.js', 'Card.js', 'Contact.js', 'index.js'],
      routes: ['auth.js', 'users.js', 'cards.js', 'index.js'],
      controllers: ['authController.js', 'userController.js', 'cardController.js'],
      services: ['emailService.js', 'smsService.js', 'uploadService.js'],
      utils: ['helpers.js', 'validators.js', 'constants.js'],
      '.': ['app.js']
    },
    '.': ['package.json', '.env', 'server.js']
  }
};

function createStructure(base, obj) {
  for (const [folder, contents] of Object.entries(obj)) {
    const folderPath = join(base, folder);
    if (!existsSync(folderPath)) mkdirSync(folderPath);

    if (Array.isArray(contents)) {
      contents.forEach(file => {
        const filePath = join(folderPath, file);
        writeFileSync(filePath, '', 'utf8');
      });
    } else {
      createStructure(folderPath, contents);
    }
  }
}

createStructure('.', structure);

console.log('✅ Project structure created successfully.');
