import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async findAllCar() {
    const carODM = new CarODM();
    const findAll = await carODM.findAll();
    const findAllArr = findAll.map((car) => this.createCarDomain(car));
    return findAllArr;
  }

  public async findById(id: string) {
    const carODM = new CarODM();
    const findId = await carODM.findById(id);
    return this.createCarDomain(findId);
  }

  public async update(id: string, car: ICar) {
    const carODM = new CarODM();
    await carODM.findIdAndUpdate(id, car);
    const update = await carODM.findById(id);
    return this.createCarDomain(update);
  }
}

export default CarService;
