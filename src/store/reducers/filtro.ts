import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as enums from '../../utils/enums/Tarefa'

type FiltroState = {
  // termo é o que será buscado
  termo?: string

  // onde o termo deve ser buscado
  criterio: 'prioridade' | 'status' | 'todas'

  // propriedade opcional com os valores pre definidos que podem ser buscados
  valor?: enums.Prioridade | enums.Status
}

const initialState: FiltroState = {
  termo: '',
  criterio: 'todas'
}

const filtroSlice = createSlice({
  name: 'filtro',
  initialState,
  reducers: {
    // função para alterar o termo de busca
    alterarTermo: (state, action: PayloadAction<string>) => {
      state.termo = action.payload
    },
    // função para alterar a filtragem pela prioridade
    alterarFiltro: (state, action: PayloadAction<FiltroState>) => {
      state.criterio = action.payload.criterio
      state.valor = action.payload.valor
    }
  }
})

export const { alterarTermo, alterarFiltro } = filtroSlice.actions

export default filtroSlice.reducer
