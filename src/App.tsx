import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EstiloGlobal, { Container } from './styles'
import store from './store'
import Home from './Pages/Home'
import Cadastro from './Pages/Cadastro'

// createBrowserRouter é onde é configurado todo o roteamento da aplicação
// RouterProvider é o componente que gerencia tudo

const rotas = createBrowserRouter([
  {
    // caminho inicial
    path: '/',

    // é o que será renderizado quando encontrar o /
    element: <Home />
  },
  {
    path: '/novo',
    element: <Cadastro />
  }
])

function App() {
  return (
    <Provider store={store}>
      <EstiloGlobal />
      <Container>
        <RouterProvider router={rotas} />
      </Container>
    </Provider>
  )
}

export default App
