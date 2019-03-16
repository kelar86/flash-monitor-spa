import { Application } from './application';
import { BodyType, Unit, Control } from './catalogs';
import { Deserializable } from './deserializable.model';
import { User } from './user';


export class Alert implements Deserializable {

    id: number;
    application: Application;
    control: Control[];
    unit: Unit[];
    body_type: BodyType[];
    author: User;
    alert_type: string;
    start_date: Date;
    finish_date: Date;
    category: string;
    description: string;
    is_planed: boolean;
    is_expiered: boolean;

    deserialize(input: any) {
        Object.assign(this, input);
        this.application = new Application().deserialize(input.application);
        this.author = new User().deserialize(input.control)
        this.control = input.control.map(i => new Control().deserialize(i));
        this.unit = input.unit.map(i => new Unit().deserialize(i));
        this.body_type = input.body_type.map(i => new BodyType().deserialize(i));

        return this;
    }
}