import * as fs from 'fs';
import * as _ from 'lodash';

export default class ConfigService {
    conf: any = {};
    config = '';
    sensible = '';

    constructor() {
        this.config = process.env.CONFIG_FILE;
        this.sensible = process.env.SENSIBLE_FILE;
    }

    init() {
        if (this.config && this.sensible) {
            try {
                let configString = fs.readFileSync(this.config, { encoding: 'UTF-8' });

                const sensibleString = fs.readFileSync(this.sensible);
                const sensible = JSON.parse(sensibleString.toString());

                _.forEach(_.keys(sensible), (key) => {
                    const valueToReplace = _.get(sensible, key);
                    const regex = new RegExp(key, 'gm');
                    configString = configString.replace(regex, valueToReplace);
                });

                this.conf = JSON.parse(configString.toString());

            } catch (err) {
                throw err;
            }
        }
    }

    get(path: string): any {
        return _.get(this.conf, path, '');
    }

    set(path: string, value: any): any {
        return _.set(this.conf, path, value);
    }
}
