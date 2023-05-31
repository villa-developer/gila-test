import { ISend, NotificationCreationAttributes } from '../../types'

abstract class Sender implements ISend {
  notification: NotificationCreationAttributes

  constructor (notification: NotificationCreationAttributes) {
    this.notification = notification
  }

  public abstract send (): Promise<boolean>
}

export default Sender
