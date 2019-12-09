import { ipcMain, IpcMainInvokeEvent } from 'electron';

export class IpcEvent {
  beforeCall: Interceptor = () => {
    return new Promise((resolve, reject) => {
      resolve();
    })
  }

  afterCall: Interceptor = () => {
    return new Promise((resolve, reject) => {
      resolve();
    })
  }

  eventList: IpcEventItem[] = [];

  init(eventList: IpcEventItem[], beforeCall?: Interceptor, afterCall?: Interceptor) {
    this.eventList = eventList;
    if (beforeCall) {
      this.beforeCall = beforeCall;
    }
    if (afterCall) {
      this.afterCall = afterCall;
    }
  }

  listen() {
    this.eventList.map((item: IpcEventItem) => {
      switch (item.type) {
        case EventTypes.Handle: {
          ipcMain.handle(item.name, async (...arg) => {
            let message: Message = {
              code: CodeTypes.Error,
              message: '未知错误',
            };
            try {
              await this.beforeCall(arg);
              const result = await item.listener(...arg);
              await this.afterCall(arg, result);

              message.data = result;
              message.code = CodeTypes.Success;
              message.message = 'succes';
            } catch (ex) {
              message.message = ex.toString();
              
            }
            return message;
          })
          break;
        }

        default:
          break;
      }
    })
  }
}

export enum EventTypes {
  Handle,
  Listen,
}

export enum CodeTypes {
  Success = 0,
  Error = 1,
  Other = 99,
}

export interface IpcEventItem {
  name: string,
  type: EventTypes,
  listener: Function,
}

export interface Message {
  code: CodeTypes;
  message: string;
  data?: any;
}

export interface Interceptor {
  (params: [IpcMainInvokeEvent, ...any[]], result?: any): Promise<any>,
}

export const eventList: IpcEventItem[] = [{
  name: 'test',
  type: EventTypes.Handle,
  listener: async function () {
    console.log('1231231')
    return '12312312';
  }
}]
