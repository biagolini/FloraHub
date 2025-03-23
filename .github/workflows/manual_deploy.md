# Deploy Manual do Angular no GitHub Pages

## Passo a Passo para Deploy Manual

### Passo 1. Instalar a Biblioteca Necessária
No terminal, dentro do diretório do seu projeto Angular, execute:

```sh
npm install -g angular-cli-ghpages
```

Isso instala globalmente a ferramenta `angular-cli-ghpages`, que facilita a publicação do build no GitHub Pages.

---

### Passo 12 Configurar o `base-href` Corretamente
Como o repositório **não** é um repositório de usuário (ou seja, não está em `biagolini.github.io`), você precisa definir corretamente o `base-href`, pois o GitHub Pages hospeda o site em:

```
https://biagolini.github.io/FloraHub/
```

Para garantir que as rotas e recursos do Angular sejam carregados corretamente, rode o seguinte comando:

```sh
ng build --configuration production --base-href "/FloraHub/"
```

Isso irá gerar os arquivos na pasta `dist/CarlosBiagolini/`.

---

### Passo 3. Fazer o Deploy para o GitHub Pages
Agora, execute o seguinte comando para enviar os arquivos para a branch `gh-pages`:

```sh
npx angular-cli-ghpages --dir=dist/CarlosBiagolini --repo="https://github.com/biagolini/FloraHub.git"
```

> **Explicação do comando:**
> - `--dir=dist/CarlosBiagolini` → Define a pasta onde o Angular gerou os arquivos.
> - `--repo="https://github.com/biagolini/FloraHub.git"` → Especifica o repositório onde os arquivos serão publicados.

Isso criará (ou atualizará) a branch `gh-pages` no seu repositório.

---

### Passo 4. Configurar o GitHub Pages no Repositório
Agora, acesse seu repositório no GitHub e siga estes passos:
1. Acesse **Settings** > **Pages**.
2. Em **Branch**, selecione `gh-pages`.
3. Clique em **Save**.

Isso fará com que o GitHub Pages sirva os arquivos corretamente.

---

## Acessando Seu Site
Depois que o deploy terminar, seu site estará disponível em:

```
https://biagolini.github.io/FloraHub/
```

Agora, toda vez que quiser atualizar o site, basta repetir os **passos 2 e 3** (`ng build` e `npx angular-cli-ghpages`).

