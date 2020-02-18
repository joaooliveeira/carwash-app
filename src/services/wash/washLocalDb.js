const Realm = require('realm');

const WashSchema = {
  name: 'Wash',
  primaryKey: 'id',
  properties: {
    id: 'string',
    clientId: { type: 'string', indexed: true },
    clientRegister: { type: 'string', indexed: true },
    carId: { type: 'string', indexed: true },
    kilometrage: { type: 'string', optional: true },
    washType: { type: 'string' },
    value: { type: 'string' },
    status: { type: 'string', indexed: true },
    created: { type: 'date', indexed: true },
    lastUpdate: { type: 'string', indexed: true, optional: true }
  }
};

export const createWashLocal = async newWash => {
  return Realm.open({ schema: [WashSchema] }).then(realm => {
    try {
      realm.write(() => {
        realm.create('Wash', newWash);
      });
      realm.close();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });
};

export const updataWashLocal = async wash => {
  return Realm.open({ schema: [WashSchema] }).then(realm => {
    try {
      realm.write(() => {
        realm.create('Wash', wash, 'modified');
      });
      realm.close();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });
};

export const getWash = async filter => {
  let wash;
  return await Realm.open({ schema: [WashSchema] }).then(realm => {
    try {
      const result = realm.objects("Wash").filtered(filter);
      if (result[0].id) {
        wash = {
          id: result[0].id,
          clientId: result[0].clientId,
          clientRegister: result[0].clientRegister,
          carId: result[0].carId,
          kilometrage: result[0].kilometrage,
          washType: result[0].washType,
          value: result[0].value,
          status: result[0].status,
          created: result[0].created,
          lastUpdate: result[0].lastUpdate
        };
      } else {
        wash = undefined;
      }
      realm.close();
      return wash;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  });
};

export const findWash = async filter => {
  return await Realm.open({ schema: [WashSchema] }).then(realm => {
    try {
      const result = realm
        .objects('Wash')
        .filtered(filter)
        .map(wash => {
          return {
            id: wash.id,
            clientId: wash.clientId,
            clientRegister: wash.clientRegister,
            carId: wash.carId,
            kilometrage: wash.kilometrage,
            washType: wash.washType,
            value: wash.value,
            status: wash.status,
            created: wash.created,
            lastUpdate: wash.lastUpdate
          };
        });
      realm.close();
      if (result.length == 0) {
        return ["NOT_FOUND"];
      } else {
        return result;
      }
    } catch (error) {
      console.log(error);
      return ["ERROR"];
    }
  });
};
