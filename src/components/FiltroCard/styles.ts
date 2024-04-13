import styled from 'styled-components'

// Criação do tipo PropsSemlegendaEContador, a partir do tipo Props,
// omitindo os atributos 'legenda' e 'contador'
//    type PropsSemlegendaEContador = Omit<Props, 'legenda' | 'contador' | 'criterio'>

type Props = {
  ativo: boolean
}

// <Props> acessa o tipo criado no arquivo tsx
// <PropsSemlegendaEContador> acessa o tipo derivado de Props, apenas com o atributo Ativo
// export const Card = styled.div<PropsSemlegendaEContador>`

export const Card = styled.div<Props>`
  padding: 8px;
  border: 1px solid ${(props) => (props.ativo ? '#1E90FF' : '#a1a1a1')};
  background-color: ${(props) => (props.ativo ? '#fff' : '#fcfcfc')};
  color: ${(props) => (props.ativo ? '#1E90FF' : '#5e5e5e')};
  border-radius: 8px;
  cursor: pointer;
`

export const Contador = styled.span`
  font-weight: bold;
  font-size: 24px;
  display: block;
`

export const Label = styled.span`
  fint-size: 14px;
`
