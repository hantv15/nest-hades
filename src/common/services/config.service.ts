export class ConfigService {
  public getFormatDateTime() {
    return this.getEnv('FORMAT_DATE_TIME');
  }

  public getTimeZone() {
    return this.getEnv('TIME_ZONE');
  }

  public getEnv(key: string): any {
    return process.env[key];
  }
}

export const configService = new ConfigService();
