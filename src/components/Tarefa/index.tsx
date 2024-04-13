// importa tudo (*) como S (style) de './styles'
import { useState, useEffect, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import * as S from './styles'
import * as enums from '../../utils/enums/Tarefa'
import { remover, editar, alteraStatus } from '../../store/reducers/tarefas'
import TarefaClass from '../../models/Tarefa'
import { BotaoSalvar } from '../../styles'

// criação de um tipo para as Props para componetização dos valores do card
type Props = TarefaClass

// desconstrução das Props com os valores definidos acima
const Tarefa = ({
  titulo,
  prioridade,
  status,
  descricao: descricaoOriginal,
  id
}: Props) => {
  // chama a função e guarda o retorno em dispatch
  const dispatch = useDispatch()

  // estado criado para possibilitar uma mudança de estado na aplicacao
  const [estaEditando, setEstaEditando] = useState(false)

  // estado criado para possibilitar editar a descrição da tarefa
  const [descricao, setDescricao] = useState('')

  // Atribui o valor original ao campo
  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

  // para saber que é o HTMLInputElement, basta apontar o mouse para o onChange do label
  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(
      alteraStatus({
        id,
        finalizado: evento.target.checked
      })
    )
  }

  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          // carrega o campo já marcado
          checked={status == enums.Status.CONCLUIDA}
          onChange={alteraStatusTarefa}
        />
        <S.Titulo>
          {estaEditando ? <em>Editando: </em> : ''}
          {titulo}
        </S.Titulo>
      </label>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>

      {/* onchange habilita a edição do campo */}
      <S.Descricao
        // disabled não habilita o campo para edição quando estaEditando é falso
        disabled={!estaEditando}
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
      />
      <S.BarraAcoes>
        {/* valida qual é o estado da aplicacao */}
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    titulo,
                    prioridade,
                    status,
                    descricao,
                    id
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>

            {/* ao clicar no botão, atribui FALSE para o estaEditando */}
            <S.BotaoCancelarRemover
              onClick={() => {
                cancelarEdicao
              }}
            >
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            {/* ao clicar no botão, atribui TRUE para o estaEditando */}
            <S.BotaoEditar onClick={() => setEstaEditando(true)}>
              Editar
            </S.BotaoEditar>
            <S.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Tarefa
