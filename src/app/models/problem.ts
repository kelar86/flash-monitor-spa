import { Application } from './application';
import { BodyType, Unit, Control } from './catalogs';
import { Deserializable } from './deserializable.model';
import { User } from './user';
import { Serializable } from './serializable.model';



export class Problem implements Deserializable, Serializable {

    id: number;
    application: Application;
    control: Control[];
    unit: Unit[];
    body_type: BodyType[];
    detection_date: {};
    description: string;
    status: string;
    author: User;


    deserialize(input: any) {
        Object.assign(this, input);
        this.application = new Application().deserialize(input.application);
        this.author = new User().deserialize(input.control);
        this.control = input.control.map(i => new Control().deserialize(i));
        this.unit = input.unit.map(i => new Unit().deserialize(i));
        this.body_type = input.body_type.map(i => new BodyType().deserialize(i));
        this.author = new User().deserialize(input.author);

        return this;
    }

    serialize() {

        return {
            application: this.application.id,
            control: this.control.map( item => item.id),
            unit: this.unit.map(item => item.id),
            body_type: this.body_type.map(item => item.id),
            detection_date: new Date(this.detection_date['year'], this.detection_date['month'] - 1, this.detection_date['day']),
            description: this.description,
            status: 'NEW',
            author: this.author.id
        };

    }
}
