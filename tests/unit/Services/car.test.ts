import sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Teste os endpoints Car', function () {    
  it('É possivel cadastrar um carro com sucesso', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: Car = new Car(
      {
        id: '644a7ae189d4b9b285d77125',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      },
    );

    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.createCar(carInput);

    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });

  it('Deveria buscar todos os carros', async function () {
    const carArr = [{
      id: '644a7ae189d4b9b285d77125',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    },
    {
      id: '644a7b2189d4b9b285d77128',
      model: 'TCross',
      year: 2022,
      color: 'Black',
      status: true,
      buyValue: 1.990,
      doorsQty: 4,
      seatsQty: 5,
    }];

    sinon.stub(Model, 'find').resolves(carArr);

    const service = new CarService();
    const result = await service.findAllCar();

    expect(result).to.be.deep.equal(carArr);

    sinon.restore();
  });

  it('Deveria buscar carro por id', async function () {
    const carId: Car = new Car(
      {
        id: '644a7ae189d4b9b285d77125',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      },
    );
      
    sinon.stub(Model, 'findById').resolves(carId);

    const service = new CarService();
    const result = await service.findById('644a7ae189d4b9b285d77125');

    expect(result).to.be.deep.equal(carId);

    sinon.restore();
  });

  it('Deveria atualizar carro com sucesso', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const updateCar = sinon.stub(Model, 'findByIdAndUpdate');

    const service = new CarService();
    service.update('644a7ae189d4b9b285d77125', carInput);
    expect(updateCar.calledOnce).to.equal(true);

    sinon.restore();
  });
});