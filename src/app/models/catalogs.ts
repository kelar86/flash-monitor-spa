import { Deserializable } from './deserializable.model';

export class Catalog implements Deserializable {
    id: number;
    name: string;
    icon: string;

    type() {
        return 'ALL';
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}

export class Control extends Catalog {
    type() {
        return this.constructor.toString();
    }
}

export class Unit extends Catalog {
    type() {
        return this.constructor.toString();
    }
}

export class BodyType extends Catalog {
    type() {
        return this.constructor.toString();
    }
}