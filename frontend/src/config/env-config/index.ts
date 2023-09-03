class EnvConfig {
  private readonly prefix: string = 'VITE_';

  getEnv(name: string): string {
    return import.meta.env[name.toUpperCase()] || import.meta.env[this.prefix + name.toUpperCase()];
  }
}

export default new EnvConfig();
