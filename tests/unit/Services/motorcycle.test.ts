import sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const motoName = 'Honda Cb 600f Hornet';

describe('Testa os endpoints Motorcycle', function () {
  it('É possivel cadastrar uma moto com sucesso', async function () {
    const motoInput: IMotorcycle = {
      model: motoName,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const motoOutput: Motorcycle = new Motorcycle({
      id: '644a890689d4b9b285d7712e',
      model: motoName,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 600,
    });
    
    sinon.stub(Model, 'create').resolves(motoOutput);

    const service = new MotorcycleService();
    const result = await service.createMoto(motoInput);

    expect(result).to.be.deep.equal(motoOutput);

    sinon.restore();
  });

  it('Deveria buscar todas as motos', async function () {
    const motoArr = [
      {
        id: '644a890689d4b9b285d7712e',
        model: motoName,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '644a8a5089d4b9b285d77131',
        model: 'Honda Cbr 1000',
        year: 2010,
        color: 'Black',
        status: true,
        buyValue: 80,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];

    sinon.stub(Model, 'find').resolves(motoArr);

    const service = new MotorcycleService();
    const result = await service.findAll();

    expect(result).to.be.deep.equal(motoArr);

    sinon.restore();
  });

  it('Deveria buscar moto por id', async function () {
    const motoId: Motorcycle = new Motorcycle({
      id: '644a890689d4b9b285d7712e',
      model: motoName,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 600,
    });

    sinon.stub(Model, 'findById').resolves(motoId);

    const service = new MotorcycleService();
    const result = await service.findById('644a890689d4b9b285d7712e');

    expect(result).to.be.deep.equal(motoId);

    sinon.restore();
  });

  it('Deveria atualizar moto com sucesso', async function () {
    const motoInput: IMotorcycle = {
      model: motoName,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const updateMoto = sinon.stub(Model, 'findByIdAndUpdate');

    const service = new MotorcycleService();
    service.update('644a890689d4b9b285d7712e', motoInput);
    expect(updateMoto.calledOnce).to.equal(true);

    sinon.restore();
  });
});