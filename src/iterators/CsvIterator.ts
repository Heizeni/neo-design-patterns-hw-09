import { readFileSync } from 'fs';
import { UserData } from '../data/UserData';

export class CsvIterator implements Iterable<UserData> {
  private users: UserData[];

  constructor(filePath: string) {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.trim().split('\n').slice(1);
    this.users = lines.map(line => {
      const [id, name, email, phone] = line.split(',');
      return { id: Number(id), name, email, phone };
    });
  }

  *[Symbol.iterator](): Iterator<UserData> {
    for (const user of this.users) {
      yield user;
    }
  }
}
