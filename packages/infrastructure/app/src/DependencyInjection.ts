import { type InjectionKey } from 'vue'
// import {
//   PartsControllerFactory,
//   PartRepositoryLocalStorage
// } from '@ichtus/breakfeastwheel-adapters'
// import { GetPartsUseCase } from '@ichtus/breakfeastwheel-domain'
import { PartsControllerFactory, PartRepositoryLocalStorage } from '../../../adapters/src/index'
import { GetPartsUseCase } from '../../../domain/src/index'

export const PARTS_CONTROLLER_FACTORY: InjectionKey<PartsControllerFactory> = Symbol()

export const dependencies = (app: any) => {
  const partRepository = new PartRepositoryLocalStorage(window.localStorage)
  const getPartsUseCase = new GetPartsUseCase(partRepository)
  const partsControllerFactory = new PartsControllerFactory(getPartsUseCase)
  app.provide(PARTS_CONTROLLER_FACTORY, partsControllerFactory)
  console.log('dependency injection', app)
}
