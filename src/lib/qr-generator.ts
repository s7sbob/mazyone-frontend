// src/lib/qr-generator.ts
import QRCodeLib from 'qrcode';

export interface QROptions {
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  shape: string;
  pattern: 'square' | 'dots' | 'rounded' | 'diamond' | 'star';
  logo?: string;
  logoSize: number;
  sticker?: string;
  eyeColor: string;
  eyeStrokeColor: string;
  eyeballColor: string;
}

export class AdvancedQRGenerator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  async generateQR(data: string, options: QROptions): Promise<string> {
    const { size } = options;
    this.canvas.width = size;
    this.canvas.height = size;

    // Generate base QR code
    const qrDataURL = await QRCodeLib.toDataURL(data, {
      width: size,
      margin: 1,
      color: {
        dark: options.foregroundColor,
        light: options.backgroundColor,
      },
    });

    return this.applyCustomizations(qrDataURL, options);
  }

private async applyCustomizations(qrDataURL: string, options: QROptions): Promise<string> {
  const img = new Image(); // Remove type annotation or use HTMLImageElement
  img.src = qrDataURL;
  
  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
  });

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // Apply shape mask
  if (options.shape !== 'square') {
    this.applyShapeMask(options);
  }

  // Draw base QR with pattern
  this.drawCustomPattern(img, options);

  // Apply sticker frame
  if (options.sticker) {
    this.applySticker(options);
  }

  // Add logo
  if (options.logo) {
    await this.addLogo(options);
  }

  return this.canvas.toDataURL();
}


  private applyShapeMask(options: QROptions) {
    const { size } = options;
    const center = size / 2;
    
    this.ctx.save();
    this.ctx.beginPath();

    switch (options.shape) {
      case 'circle':
        this.ctx.arc(center, center, center - 20, 0, 2 * Math.PI);
        break;
      case 'heart':
        this.drawHeart(center, center, size * 0.4);
        break;
      case 'star':
        this.drawStar(center, center, 5, size * 0.4, size * 0.2);
        break;
      case 'hexagon':
        this.drawHexagon(center, center, size * 0.4);
        break;
      case 'diamond':
        this.drawDiamond(center, center, size * 0.35);
        break;
      case 'apple':
        this.drawApple(center, center, size * 0.4);
        break;
      default:
        this.ctx.rect(20, 20, size - 40, size - 40);
    }

    this.ctx.clip();
  }

  private drawCustomPattern(img = new Image(), options: QROptions) {
    if (options.pattern === 'square') {
      this.ctx.drawImage(img, 0, 0);
      return;
    }

    // Convert QR to custom pattern
    this.ctx.drawImage(img, 0, 0);
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background
    this.ctx.fillStyle = options.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const moduleSize = this.canvas.width / 25; // Approximate QR module size

    for (let y = 0; y < this.canvas.height; y += moduleSize) {
      for (let x = 0; x < this.canvas.width; x += moduleSize) {
        const pixel = this.getPixel(data, x, y, this.canvas.width);
        
        if (this.isBlackPixel(pixel)) {
          this.ctx.fillStyle = options.foregroundColor;
          this.drawModule(x, y, moduleSize, options.pattern);
        }
      }
    }
  }

  private drawModule(x: number, y: number, size: number, pattern: string) {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    const radius = size * 0.4;

    this.ctx.save();
    
    switch (pattern) {
      case 'dots':
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        break;
      case 'rounded':
        this.ctx.beginPath();
        this.ctx.roundRect(x + 1, y + 1, size - 2, size - 2, size * 0.2);
        this.ctx.fill();
        break;
      case 'diamond':
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, y);
        this.ctx.lineTo(x + size, centerY);
        this.ctx.lineTo(centerX, y + size);
        this.ctx.lineTo(x, centerY);
        this.ctx.closePath();
        this.ctx.fill();
        break;
      case 'star':
        this.drawStar(centerX, centerY, 5, radius, radius * 0.5);
        this.ctx.fill();
        break;
      default:
        this.ctx.fillRect(x, y, size, size);
    }
    
    this.ctx.restore();
  }

  private applySticker(options: QROptions) {
    const { size } = options;
    const sticker = this.getStickerConfig(options.sticker!);
    
    if (!sticker) return;

    // Draw sticker frame
    this.ctx.save();
    this.ctx.strokeStyle = sticker.borderColor;
    this.ctx.lineWidth = 8;
    this.ctx.setLineDash(sticker.dashPattern || []);
    
    const margin = 15;
    this.ctx.strokeRect(margin, margin, size - margin * 2, size - margin * 2);
    
    // Add sticker text/icon
    if (sticker.text) {
      this.ctx.fillStyle = sticker.textColor;
      this.ctx.font = 'bold 16px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(sticker.text, size / 2, 35);
    }
    
    this.ctx.restore();
  }

private async addLogo(options: QROptions) {
  if (!options.logo) return;

  const logoImg = new Image(); // Fixed: Remove Image type annotation
  logoImg.src = options.logo;
  
  await new Promise<void>((resolve) => {
    logoImg.onload = () => resolve();
  });

  const logoSize = options.logoSize;
  const x = (this.canvas.width - logoSize) / 2;
  const y = (this.canvas.height - logoSize) / 2;

  // Draw logo background
  this.ctx.fillStyle = '#FFFFFF';
  this.ctx.fillRect(x - 4, y - 4, logoSize + 8, logoSize + 8);
  
  // Draw logo
  this.ctx.drawImage(logoImg, x, y, logoSize, logoSize);
}

  // Shape drawing methods
  private drawHeart(x: number, y: number, size: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y + size * 0.3);
    this.ctx.bezierCurveTo(x, y, x - size * 0.5, y, x - size * 0.5, y + size * 0.3);
    this.ctx.bezierCurveTo(x - size * 0.5, y + size * 0.6, x, y + size * 0.9, x, y + size);
    this.ctx.bezierCurveTo(x, y + size * 0.9, x + size * 0.5, y + size * 0.6, x + size * 0.5, y + size * 0.3);
    this.ctx.bezierCurveTo(x + size * 0.5, y, x, y, x, y + size * 0.3);
    this.ctx.closePath();
  }

  private drawStar(x: number, y: number, points: number, outer: number, inner: number) {
    this.ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outer : inner;
      const angle = (i * Math.PI) / points;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) this.ctx.moveTo(px, py);
      else this.ctx.lineTo(px, py);
    }
    this.ctx.closePath();
  }

  private drawHexagon(x: number, y: number, size: number) {
    this.ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const px = x + Math.cos(angle) * size;
      const py = y + Math.sin(angle) * size;
      if (i === 0) this.ctx.moveTo(px, py);
      else this.ctx.lineTo(px, py);
    }
    this.ctx.closePath();
  }

  private drawDiamond(x: number, y: number, size: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - size);
    this.ctx.lineTo(x + size, y);
    this.ctx.lineTo(x, y + size);
    this.ctx.lineTo(x - size, y);
    this.ctx.closePath();
  }

  private drawApple(x: number, y: number, size: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y + size * 0.1, size * 0.8, 0, Math.PI * 2);
    // Add apple stem
    this.ctx.moveTo(x, y - size * 0.7);
    this.ctx.lineTo(x, y - size * 0.3);
    // Add apple leaf
    this.ctx.bezierCurveTo(x + size * 0.1, y - size * 0.6, x + size * 0.3, y - size * 0.5, x + size * 0.2, y - size * 0.3);
    this.ctx.closePath();
  }

  private getStickerConfig(stickerId: string) {
    const stickers: Record<string, any> = {
      'hiring-1': {
        borderColor: '#10B981',
        textColor: '#10B981',
        text: 'نوظف الآن',
        dashPattern: []
      },
      'hiring-2': {
        borderColor: '#3B82F6',
        textColor: '#3B82F6',
        text: 'باحث عن وظيفة',
        dashPattern: []
      },
      'support-1': {
        borderColor: '#EF4444',
        textColor: '#EF4444',
        text: 'دعم فلسطين',
        dashPattern: []
      },
      'celebration-1': {
        borderColor: '#F59E0B',
        textColor: '#F59E0B',
        text: 'عيد مبارك',
        dashPattern: [5, 5]
      }
    };
    return stickers[stickerId];
  }

  private getPixel(data: Uint8ClampedArray, x: number, y: number, width: number) {
    const i = (Math.floor(y) * width + Math.floor(x)) * 4;
    return [data[i], data[i + 1], data[i + 2], data[i + 3]];
  }

  private isBlackPixel(pixel: number[]) {
    return pixel[0] < 128;
  }
}
