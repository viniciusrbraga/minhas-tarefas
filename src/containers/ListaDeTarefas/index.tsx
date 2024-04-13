import { useSelector } from 'react-redux'

import Tarefa from '../../components/Tarefa'
import { MainContainer, Titulo } from '../../styles'
import { RootReducer } from '../../store'

const ListaDeTarefas = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)

  // pega o termo da filtragem
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  // busca o termo no titulo das tarefas e retorna a lista de tarefas com o termo buscado
  // toLowerCase troca tudo para minusculo, para desconsiderar maiusculas na pesquisa
  const filtraTarefas = () => {
    // como o termo é opcional, temos que testar se está preenchido
    // undefined foi colocado para que o termo vazio não seja considerado FALSE
    if (termo != undefined) {
      // contem todos os itens
      let tarefasFiltradas = itens

      // retorna a filtragem com base no que foi informado
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) => item.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
      )

      // após filtrar pelo que foi informado no campo, vamos filtrar pelo que foi clicado nos botões
      if (criterio === 'prioridade') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.status === valor
        )
      }

      return tarefasFiltradas
    } else {
      // se não tiver o que pesquisar, retorna todos os itens
      return itens
    }
  }

  // formata mensagem de retorno da pesquisa
  const exibeResultadoFiltragem = (quant: number) => {
    let message = ''

    const complemento =
      termo !== undefined && termo.length > 0 ? `e "${termo}"` : ''

    const compl = quant > 1 ? 'tarefas encontradas' : 'tarefa encontrada'

    if (criterio === 'todas') {
      message = `${quant} ${compl} como: 'todas' ${complemento}`
    } else {
      message = `${quant} ${compl} como: "${`${criterio}=${valor}`}" ${complemento}`
    }

    return message
  }

  // task criada para não ter que chamar 2x a mesma função
  const task = filtraTarefas()
  const texto = exibeResultadoFiltragem(task.length)

  return (
    <MainContainer>
      <Titulo as="p">{texto}</Titulo>
      <ul>
        {/* {itens.map((t) => ( */}
        {task.map((t) => (
          <li key={t.titulo}>
            <Tarefa
              id={t.id}
              titulo={t.titulo}
              descricao={t.descricao}
              prioridade={t.prioridade}
              status={t.status}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeTarefas
