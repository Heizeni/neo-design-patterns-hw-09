import { readFileSync } from 'fs';
import { UserData } from '../data/UserData';

export class XmlIterator implements Iterable<UserData> {
  private users: UserData[];

  constructor(filePath: string) {
    const content = readFileSync(filePath, 'utf-8');
    const userMatches = [...content.matchAll(/<user>([\s\S]*?)<\/user>/g)];
    this.users = userMatches.map(match => {
      const id = Number(match[1].match(/<id>(.*?)<\/id>/)![1]);
      const name = match[1].match(/<name>(.*?)<\/name>/)![1];
      const email = match[1].match(/<email>(.*?)<\/email>/)![1];
      const phone = match[1].match(/<phone>(.*?)<\/phone>/)![1];
      return { id, name, email, phone };
    });
  }

  *[Symbol.iterator](): Iterator<UserData> {
    for (const user of this.users) {
      yield user;
    }
  }
}
