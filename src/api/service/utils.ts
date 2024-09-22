import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'abc';

export class PasswordService {
  private static readonly SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10')

  public static async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(PasswordService.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  public static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}

export class AuthService {
  private static readonly JWT_SECRET = secret;

  public static generateToken(id: string): string {
    return jwt.sign({ id }, AuthService.JWT_SECRET, { expiresIn: '30 days' });
  }

  public static verifyToken(token: string): string | null {
    try {
      const decoded = jwt.verify(token, AuthService.JWT_SECRET);
      if (typeof decoded === 'object' && decoded !== null) {
        return decoded.id;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

export class ImageHostingService {
  private static readonly TOKEN = process.env.GITHUB_TOKEN;
  private static readonly REPO_NAME = 'MartinsRNImages';

  constructor() {}

  public static async uploadImage(imageBuffer: Buffer, path: string) {
    const url = `https://api.github.com/repos/LuanCLF/${this.REPO_NAME}/contents/images/${path}`;
    
    const getResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

     let sha: string | undefined;

     if (getResponse.ok) {
       const fileData = await getResponse.json();
       sha = fileData.sha;
     }
    
     const body = JSON.stringify({
       message: 'Image upload',
       content: imageBuffer.toString('base64'),
       ...(sha && { sha }), 
     });

     const response = await fetch(url, {
       method: 'PUT',
       headers: {
         'Authorization': `Bearer ${this.TOKEN}`,
         'Content-Type': 'application/json',
       },
       body,
     });

     const data = await response.json();
     
     return data.content.download_url;
  }

  public static async deleteImage (imageName: string) { 
    const url = `https://api.github.com/repos/LuanCLF/${this.REPO_NAME}/contents/images/${imageName}`;

    const getResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

     let sha = await getResponse.json().then((data) => data.sha);

     console.log("sha: ", sha);
     

    if (sha == undefined) return;

    console.log("passou mesmo com undefiner");


    const deleteResponse = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Delete image',
        sha: sha,
      }),
    });
  
    if (!deleteResponse.ok) {
      const deleteErrorData = await deleteResponse.json();
      console.error("Erro ao deletar o arquivo:", deleteErrorData);
    }
  
    return;
  };
  

}


