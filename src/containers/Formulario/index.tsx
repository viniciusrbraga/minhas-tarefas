import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BotaoSalvar, MainContainer, Titulo } from '../../styles'
import { Campo } from '../../styles'
import { Form, Opcoes, Opcao } from './styles'
import * as enums from '../../utils/enums/Tarefa'
import { cadastrar } from '../../store/reducers/tarefas'

const Formulario = () => {
  // usado para atualizar a store
  const dispatch = useDispatch()
  // usado para mudar a rota, voltando para a página anterior
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.NORMAL)

  const cadastrarTarefa = (evento: FormEvent) => {
    // preventDefault serve para não recarregar a página
    evento.preventDefault()

    dispatch(
      cadastrar({
        titulo,
        prioridade,
        descricao,
        status: enums.Status.PENDENTE
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Titulo>Nova tarefa</Titulo>
      <Form onSubmit={cadastrarTarefa}>
        <Campo
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          type="text"
          placeholder="Título"
        />
        <Campo
          value={descricao}
          onChange={({ target }) => setDescricao(target.value)}
          as="textarea"
          placeholder="Descrição da tarefa"
        />
        <Opcoes>
          <p>Prioridade</p>

          {/* iteração no objeto enums.Prioridade */}
          {/* Object.values pega os valores de um objeto */}
          {/* passa o objeto enums.Prioridade */}
          {/* retorna no array prioridade iterado pelo map */}

          {Object.values(enums.Prioridade).map((prioridade) => (
            // pra cada prioridade, retorna um fragmento (está com OPCAO para poder usar o KEY)
            // dentro do fragmento temos um input e um label
            // os valores de ID, HTMLFOR e <DESCRICAO DA LABEL> são preenchidos dinamicamente com jaca script
            // opcao é um componente estilizado para formatar as opções da tela
            <Opcao key={prioridade}>
              <input
                // acesso à propriedade URGENTE do objeto Prioridade
                value={prioridade}
                name="prioridade"
                type="radio"
                // preenchimento dinamico com {prioridade}
                id={prioridade}
                // marca a opção NORMAL ao carregar a lista de opções
                defaultChecked={prioridade === enums.Prioridade.NORMAL}
                // as enums.Prioridade serve para poder atribuir o valor como string
                onChange={(evento) =>
                  setPrioridade(evento.target.value as enums.Prioridade)
                }
              />{' '}
              {/* preenchimento dinamico com {prioridade} */}
              <label htmlFor={prioridade}>{prioridade}</label>
            </Opcao>
          ))}
        </Opcoes>
        <BotaoSalvar type="submit">Cadastrar</BotaoSalvar>
      </Form>
    </MainContainer>
  )
}

export default Formulario
