import { type InjectionKey } from 'vue'
// import {
//   PartsControllerFactory,
//   PartRepositoryLocalStorage
// } from '@ichtus/breakfeastwheel-adapters'
// import { GetPartsUseCase } from '@ichtus/breakfeastwheel-domain'
import {
  PartsControllerFactory,
  AddPartControllerFactory,
  PartRepositoryLocalStorage
} from '../../../adapters/src/index'
import { GetPartsUseCase, AddPartUseCase, DeletePartsUseCase } from '../../../domain/src/index'

export const PARTS_CONTROLLER_FACTORY: InjectionKey<PartsControllerFactory> = Symbol()
export const ADD_PART_CONTROLLER_FACTORY: InjectionKey<AddPartControllerFactory> = Symbol()

export const dependencies = (app: any) => {
  const partRepository = new PartRepositoryLocalStorage(window.localStorage)

  const getPartsUseCase = new GetPartsUseCase(partRepository)
  const deletePartsUseCase = new DeletePartsUseCase(partRepository)

  const partsControllerFactory = new PartsControllerFactory(getPartsUseCase, deletePartsUseCase)

  const addPartUseCase = new AddPartUseCase(partRepository)
  const addPartControllerFactory = new AddPartControllerFactory(addPartUseCase)

  app.provide(PARTS_CONTROLLER_FACTORY, partsControllerFactory)
  app.provide(ADD_PART_CONTROLLER_FACTORY, addPartControllerFactory)
}
