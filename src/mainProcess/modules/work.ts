import { IpcEventItem, EventTypes } from '../events'
import * as fs from 'fs';
import { worklistPath } from '../../../data/filepath';



const workEventList: IpcEventItem[] = [{
  name: 'work',
  type: EventTypes.Handle,
  listener: async function () {
    // 获取一个文件 然后返回这个文件的内容
    async function readFile(): Promise<object> {
      return new Promise((resolve, reject) => {
        fs.readFile(worklistPath, 'utf-8', (error, data) => {
          if (error) {
            reject(error);
          }
          resolve(JSON.parse(data));
        })
      })
    }
    const data = await readFile();
    return data;
  }
}]
export default workEventList;