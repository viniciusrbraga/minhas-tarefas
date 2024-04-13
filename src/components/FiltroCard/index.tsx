import { useDispatch, useSelector } from 'react-redux'
import * as S from './styles'
import * as enums from '../../utils/enums/Tarefa'
import { alterarFiltro } from '../../store/reducers/filtro'
import { RootReducer } from '../../store'

// tipo criado para ser usado no arquivo de estilos
export type Props = {
  legenda: string
  criterio: 'prioridade' | 'status' | 'todas'
  valor?: enums.Prioridade | enums.Status
}

// props.Props passado como parametro para o arquivo de estilos
// desestruturando o Props
const FiltroCard = ({ legenda, criterio, valor }: Props) => {
  // para fazer a atualização do estado através deste componente
  const dispatch = useDispatch()

  // acessa o estado, para pegar o filtro
  const { filtro, tarefas } = useSelector((state: RootReducer) => state)

  const verificaEstaAtivo = () => {
    // valida se o criterio passado é o mesmo do card
    const mesmoCriterio = filtro.criterio === criterio

    // valida se o valor passado é o mesmo do card
    const mesmoValor = filtro.valor === valor

    return mesmoCriterio && mesmoValor
  }

  // conta quantos itens atendem ao criterio definido
  const contarTarefas = () => {
    if (criterio === 'todas') return tarefas.itens.length

    if (criterio === 'prioridade') {
      return tarefas.itens.filter((item) => item.prioridade === valor).length
    }

    if (criterio === 'status') {
      return tarefas.itens.filter((item) => item.status === valor).length
    }
  }

  const filtrar = () => {
    dispatch(
      alterarFiltro({
        criterio,
        valor
      })
    )
  }

  // guarda o card ativo, para aplicar o estilo azul
  const ativo = verificaEstaAtivo()

  // guarda o total de tarefas, de acordo com os critérios
  const contador = contarTarefas()

  // ativo={props.ativo} permite o uso do tipo no componente Card
  // <S.Card ativo={props.ativo}>
  return (
    <S.Card ativo={ativo} onClick={filtrar}>
      <S.Contador>{contador}</S.Contador>
      <S.Label>{legenda}</S.Label>
    </S.Card>
  )
}

export default FiltroCard
