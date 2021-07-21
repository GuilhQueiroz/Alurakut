import React from 'react';
import MainGrid from '../src/components/MainGrid/'
import Box from '../src/components/Box';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import { communities } from '../src/components/Comunidades';
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault , OrkutNostalgicIconSet} from '../src/lib/alurakutCommons'
import {ProfileRelationsBoxWrapper} from '../src/components/profileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img className="userFoto" src={`https://github.com/${propriedades.githubUser}.png`} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>

        </a>
      </p>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(prop) {
  return (
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {prop.title} ({prop.items.length})
    </h2>

    <ul>
      { /* seguidores.map((itemAtual, i) => {

        if (i < 6) return (
          <li key={itemAtual}>
            <a href={`/users/${itemAtual}.png`} >
              <img src={`https://github.com/${itemAtual}.png`} />
              <span>{itemAtual}</span>
            </a>
          </li>
        )
      }) */ }
    </ul>
  </ProfileRelationsBoxWrapper>
  )
}



export default function Home(props) {
  const usuarioAleatorio = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);
  const [createPub, setCreatePub] = React.useState('');
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  const [seguidores, setSeguidores] = React.useState([]);
  const [seguindo, setSeguindo] = React.useState([]);
  const token = '3c27efc28ae1ee950bcbf361f120e6';
  React.useEffect(function () {
    fetch('https://api.github.com/users/Gui-guimaraes/followers')
      .then(function(res) {
        return res.json();
      }) 
      .then(function(result) {
        setSeguidores(result);
      })
    fetch ('https://api.github.com/users/Gui-guimaraes/following')
      .then(function(res) {
        return res.json();
      })
      .then(function(result) {
        setSeguindo(result);
      })
    fetch (
      'https://graphql.datocms.com/', 
      {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({"query": `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }`})
    })
    .then((res) => res.json())
    .then ((result) => {
      const comunidadesDato = result.data.allCommunities;
      console.log(comunidades)
      setComunidades(comunidadesDato)
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])


  return (
    <>
      <AlurakutMenu />
        <MainGrid>
          <div className="profileArea" style={{gridArea: 'profileArea'}}>
            <ProfileSidebar githubUser={usuarioAleatorio} />
          </div>
          <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
            <Box>
              <form onSubmit={function handleCreatePub(e) {
                e.preventDefault();


              }}>
                <div>
                  <img src={`https://github.com/${usuarioAleatorio}.png`} style={{borderRadius: '50%', width: '50px', marginRight: 'auto', marginBottom: '8px'}} />
                   <h1 style={{fontSize: '30px', textAlign: 'center',}} className="title">Bem vindo(a), {usuarioAleatorio}</h1>
                </div>
                <div>
                <input 
                placeholder="Começar Publicação"
                value={createPub}
                onChange={(event) => {
                  setCreatePub(event.target.value)
                }}
                name="Começar Publicação"
                />
                 <button  style={{width: '100%', display: 'block', marginTop: '-8px', padding: '12px', background: '#F4F4F4', border: 0, color: '#333333'}}>
                    Enviar
                  </button>
                  <hr />
                  <OrkutNostalgicIconSet />
                </div>
              </form>
            </Box>
            
            <Box>
              <form onSubmit={function handleCreateCommunity(e) {
                e.preventDefault(e)

                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatoSlug: usuarioAleatorio,
                  
                }

                fetch
                ('/api/comunidades', 
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  const dados = await response.json();
                  const comunidade = dados.regristoCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas);
                })

              }}>
                <input 
                  placeholder="Criar Comunidade"
                  name="Criar Comunidade"
                  aria-label="Criar Comunidade"

                />
                <input 
                placeholder="Coloque um url para capa da comunidade"
                name="image"
                aria-label="Coloque um url para capa da comunidade"

                />
                <button style={{width: '100%', display: 'block', marginTop: '-8px', padding: '12px', background: '#F4F4F4', border: 0, color: '#333333'}}>
                  Enviar
                </button>
              </form>
            </Box>
          </div>
          <div className="profileRelations" style={{gridArea: 'profileRelationsArea'}}>
            <ProfileRelationsBox title="Seguindo" items={seguindo} />
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Pessoas da comunidade ({pessoasFavoritas.length})
              </h2>

              <ul>
                {pessoasFavoritas.map((itemAtual, i) => {

                  if (i < 6) return (
                    <li key={itemAtual}>
                      <a href={`/users/${itemAtual}.png`} >
                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>

            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Comunidades ({comunidades.length})
              </h2>

              <ul>
                {comunidades.map((itemAtual, i) => {

                  if(i < 6) return (
                    <li key={itemAtual.id}>
                      <a href={`/communities/${itemAtual.link}`} >
                        <img src={itemAtual.imageUrl || `https://picsum.photos/300/300`} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>
          </div>
        </MainGrid>
    </>
  )
}




export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { githubUser } = jwt.decode(token);

  

  if (!githubUser) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}
