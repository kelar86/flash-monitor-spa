import { Deserializable } from './deserializable.model';

export class User implements Deserializable {

    username: string;
    first_name: string;
    last_name: string;
    email: string;

    deserialize(input: any) {
        return this;
    }
}