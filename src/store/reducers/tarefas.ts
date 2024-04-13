import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as enums from '../../utils/enums/Tarefa'
import Tarefa from '../../models/Tarefa'

type TarefasState = {
  itens: Tarefa[]
}

const initialState: TarefasState = {
  itens: [
    new Tarefa(
      'Estudar JS',
      enums.Prioridade.IMPORTANTE,
      enums.Status.PENDENTE,
      'Ler o manual',
      1
    ),
    new Tarefa(
      'Estudar TS',
      enums.Prioridade.URGENTE,
      enums.Status.CONCLUIDA,
      'Rever aula 2 do módulo',
      2
    ),
    new Tarefa(
      'Estudar React',
      enums.Prioridade.NORMAL,
      enums.Status.PENDENTE,
      'Praticar o useEffect',
      3
    )
  ]
}

// criação do slice (pedacinho do estado)
const tarefasSlice = createSlice({
  // nome do reducer
  name: 'tarefas',

  // estado inicial - lista de tarefas (objs)
  initialState,

  // initialState: {
  //   itens: [
  //     new Tarefa(
  //       'Estudar JS',
  //       enums.Prioridade.IMPORTANTE,
  //       enums.Status.PENDENTE,
  //       '',
  //       1
  //     ),
  //     new Tarefa(
  //       'Estudar TS',
  //       enums.Prioridade.URGENTE,
  //       enums.Status.CONCLUIDA,
  //       'Rever aula 2 do módulo',
  //       2
  //     ),
  //     new Tarefa(
  //       'Estudar React',
  //       enums.Prioridade.NORMAL,
  //       enums.Status.PENDENTE,
  //       'Praticar o useEffect',
  //       3
  //     )
  //   ]
  // },

  reducers: {
    // função que irá remover uma tarefa

    // <number> é o ID a ser removido da lista
    remover: (state, action: PayloadAction<number>) => {
      // carrega o state com a lista de tarefas diferentes do ID informado
      state.itens = state.itens.filter((tarefa) => tarefa.id !== action.payload)
    },
    editar: (state, action: PayloadAction<Tarefa>) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      // se não encontrar, o retorno será -1
      // testar se é 0 significa que encontrou na 1ª ocorrência
      if (indexDaTarefa >= 0) {
        // atribui o valor para a tarefa no indice encontrado
        state.itens[indexDaTarefa] = action.payload
      }
    },
    // Omit define que o ID será omitido
    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      // pesquisa se a tarefa já existe
      const tarefaJaExiste = state.itens.find(
        // busca uma tarefa onde o titulo seja igual ao titulo que está sendo
        // passado como parametro em action: PayloadAction<Tarefa>
        (tarefa) =>
          tarefa.titulo.toLowerCase() === action.payload.titulo.toLowerCase()
      )

      if (tarefaJaExiste) {
        alert('Já existe uma tarefa com esse nome')
      } else {
        // length - 1 pega o ultimo item do array de tarefas
        const ultimaTarefa = state.itens[state.itens.length - 1]
        const tarefaNova = {
          // ...action.payload pega tudo que está dentro de action.payload
          ...action.payload,
          // se existir tarefas, retorna o id da última + 1, senão, retorna 1
          id: ultimaTarefa ? ultimaTarefa.id + 1 : 1
        }
        state.itens.push(tarefaNova)
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      // se não encontrar, o retorno será -1
      // testar se é 0 significa que encontrou na 1ª ocorrência
      if (indexDaTarefa >= 0) {
        // atribui o valor para a tarefa no indice encontrado
        state.itens[indexDaTarefa].status = action.payload.finalizado
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
      }
    }
  }
})

export const { remover, editar, cadastrar, alteraStatus } = tarefasSlice.actions

export default tarefasSlice.reducer
