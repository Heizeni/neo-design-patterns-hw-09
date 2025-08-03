import { DataExporter } from './DataExporter';
import { writeFileSync } from 'fs';

export class XmlExporter extends DataExporter {
  protected render(): string {
    const usersXml = this.data.map(user => `
  <user>
    <id>${user.id}</id>
    <name>${user.name}</name>
    <email>${user.email}</email>
    <phone>${user.phone}</phone>
  </user>`).join('\n');

    const result = `<?xml version="1.0" encoding="UTF-8"?>\n<users>${usersXml}\n</users>`;
    return result;
  }

  protected afterRender(): void {
    this.result += `\n<!-- Експорт згенеровано: ${new Date().toISOString()} -->`;
  }

  protected save(): void {
    writeFileSync('./dist/users.xml', this.result);
  }
}
