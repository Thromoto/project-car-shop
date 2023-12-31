import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorcycleDomain(moto: IMotorcycle | null): Motorcycle | null {
    if (moto) {
      return new Motorcycle(moto);
    }
    return null;
  }

  public async createMoto(moto: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    const newMoto = await motoODM.create(moto);
    return this.createMotorcycleDomain(newMoto);
  }

  public async findAll() {
    const motoODM = new MotorcycleODM();
    const findAll = await motoODM.findAll();
    const findAllArr = findAll.map((moto) => this.createMotorcycleDomain(moto));
    return findAllArr;
  }

  public async findById(id: string) {
    const motoODM = new MotorcycleODM();
    const findId = await motoODM.findById(id);
    return this.createMotorcycleDomain(findId);
  }

  public async update(id: string, moto: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    await motoODM.findIdAndUpdate(id, moto);
    const update = await motoODM.findById(id);
    return this.createMotorcycleDomain(update);
  }
}

export default MotorcycleService;
