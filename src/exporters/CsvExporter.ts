import { DataExporter } from './DataExporter';
import { writeFileSync } from 'fs';

export class CsvExporter extends DataExporter {
  protected render(): string {
    const header = 'id,name,email,phone';
    const rows = this.data.map(u => `${u.id},${u.name},${u.email},${u.phone}`);
    return [header, ...rows].join('\n');
  }

  protected save(): void {
    writeFileSync('./dist/users.csv', this.result);
  }
}
