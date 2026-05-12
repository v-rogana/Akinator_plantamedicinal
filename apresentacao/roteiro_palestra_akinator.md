# Herbário Vivo
### Uma chave taxonômica que aprende a perguntar

**Público:** pós-graduandos e pesquisadores de Biologia
**Duração estimada:** 9 minutos
**Formato:** fala curta com demonstração ao vivo do app no celular dos participantes

---

## Abertura (0:00 a 1:00)

Eu queria começar com uma pergunta meio boba, mas levantem a mão sem vergonha. Quem aqui, na graduação, já passou uma tarde inteira na frente de uma chave taxonômica dicotômica querendo xingar a chave inteira? [pausa para risadas]

Pois é. Agora a pergunta versão dois. Quem, depois de sofrer com a chave, já pensou: "cara, se eu tivesse respondido a essa pergunta de número trinta lá no começo, eu já teria chegado na espécie em três passos"?

É exatamente desse incômodo que sai a coisa que eu trouxe pra mostrar hoje. É um app web, chama Herbário Vivo, e ele funciona como uma chave taxonômica. Só que, em vez de a chave ser fixa, escrita uma vez por um botânico e impressa, ela se reorganiza a cada resposta sua, escolhendo sempre a próxima pergunta que mais separa o conjunto. É uma chave que aprende a perguntar.

A tese da fala é essa. Vou te mostrar duas coisas. Primeiro, como ele decide a próxima pergunta. Depois, eu abro o link e a gente brinca com ele aqui na sala.

---

## Pilar 1. Como o app pensa (1:00 a 3:30)

Imagina que eu tenho quarenta espécies medicinais de Minas Gerais na mesa. Cerrado, Mata Atlântica, espécies que aparecem na RENISUS, espécies que vocês conhecem bem. Eu posso fazer perguntas a você, e cada resposta sua elimina algumas espécies.

A questão é qual pergunta fazer primeiro.

Se eu perguntar "essa planta tem espinhos?", e olhar pra minha base de quarenta, eu vejo que pouquíssimas espécies têm espinho. Essa pergunta é péssima como abridora. Se você diz "não", quase nada é eliminado, e eu desperdicei uma rodada.

Agora se eu perguntar "essa planta é encontrada no Cerrado ou na Mata Atlântica?", eu divido a base mais ou menos no meio. Cada resposta sua corta o conjunto significativamente. Essa pergunta é muito melhor, porque ela reduz mais a incerteza.

O algoritmo formaliza isso com uma coisa que vocês já conhecem de outros contextos. É entropia, no sentido de Shannon. A cada rodada, o app calcula, para cada pergunta possível ainda não feita, qual é a entropia esperada do conjunto depois daquela pergunta. E escolhe a pergunta que mais reduz a entropia. Em uma palavra, o algoritmo escolhe a pergunta de maior ganho de informação.

É a mesma lógica que está dentro de uma árvore de decisão clássica em aprendizado de máquina. Só que aqui o uso é diferente, e mais bonito, na minha opinião. Não é um classificador estático treinado uma vez. É um sistema interativo que recalcula a melhor próxima pergunta toda vez que você responde, com base no conjunto de candidatas que sobrou.

E tem dois detalhes que valem dizer, porque ressoam com a prática de vocês.

Primeiro, o "Não sei". Em chave dicotômica de verdade, dado faltante é um problema sério. Aqui o "Não sei" simplesmente não elimina nada e o algoritmo escolhe a próxima pergunta entre as restantes que ainda discriminam bem. Isso é poderoso pra contexto educativo, porque a pessoa não fica encurralada quando não sabe responder.

Segundo, tem uma ordem suave de prioridade entre tipos de pergunta. O algoritmo prefere começar pelas perguntas macroscópicas: bioma, porte, parte usada, uso medicinal. Só depois entra em características morfológicas finas e em fitoquímica, taninos, flavonoides, lactonas sesquiterpênicas. Isso é uma escolha de design, não uma propriedade do algoritmo. Eu coloquei esse viés porque é o caminho que um botânico ou farmacognosta faria naturalmente: do contexto pro detalhe.

---

## Demo ao vivo (3:30 a 7:00)

Beleza, basta de teoria. Vamos abrir o app.

[Abre o link no projetor. Se possível, deixa o QR code já no slide pra quem quiser acessar no celular.]

Eu vou pensar numa planta antes da gente começar. Sem combinar com vocês. [Pensa no Barbatimão.] Pronto.

[Clica "Começar". Lê a primeira pergunta em voz alta.]

Olha que interessante. A primeira pergunta dele foi sobre bioma. Ele começou pelo que mais separa o conjunto, exatamente o que eu falei agora há pouco. Eu respondo Cerrado, e olha o contador de candidatas caindo no canto da tela.

[Responde a próxima pergunta. Em algum momento, propositalmente, marca "Não sei".]

Repara nisso. Eu acabei de responder "Não sei". O app não eliminou nada. Ele só escolheu outra pergunta que ainda divide bem o conjunto restante. Isso é o tratamento de dado faltante que eu mencionei.

[Continua. Chega no resultado, que vai ser Barbatimão.]

Olha, ele chegou. Stryphnodendron adstringens, Fabaceae, Cerrado sensu stricto. Repara que ele não só dá o nome. Ele te entrega um carrinho de informação. Família, parte usada, princípios ativos, classes químicas, e uma curiosidade com referências bibliográficas. Esses dados vêm da RENISUS do Ministério da Saúde e de uma revisão sistemática publicada em Molecules, que estão linkadas na ficha da planta. Quem tiver interesse a tela de referências mostra a bibliografia inteira do projeto.

[Se sobrar tempo, faz uma segunda rodada rápida no Modo Desafio, respondendo uma pergunta de propósito errado, pra mostrar a tela de divergências.]

No Modo Desafio, a gente vê o que aconteceu quando a pessoa erra. Aparece quais foram as respostas certas, e em quais perguntas houve divergência. É um material didático ótimo, porque transforma o "errou" em uma chance de discussão sobre a planta.

---

## Pilar 2. O que a base ensina (7:00 a 8:30)

Eu queria fechar com uma coisa que apareceu na construção. Quando você sai do papel de quem usa o app e entra no papel de quem alimenta a base, três aprendizados ficam claros.

O primeiro é que a fitoquímica é uma camada de discriminação muito boa. Quando você tem duas espécies parecidas na morfologia, parecidas no bioma, parecidas até no uso, a presença de uma classe química específica resolve. Taninos condensados na casca te leva pro Barbatimão e pra Aroeira. Lactonas sesquiterpênicas te leva pra Arnica do Cerrado. O algoritmo trata isso como mais uma pergunta, mas pra quem entende de princípios ativos a leitura é riquíssima.

O segundo aprendizado é o oposto. Quanto mais a gente põe espécies parecidas na base, mais o algoritmo precisa de perguntas finas pra discriminar. Aroeira e Barbatimão dão trabalho pra separar com perguntas grossas. Isso me ensinou uma coisa que vocês conhecem bem como biólogos: chave taxonômica não é só sobre as espécies, é sobre as diferenças entre elas. Sem diferença reportada na base, não tem como o algoritmo achar a pergunta certa.

O terceiro é mais filosófico. Cada campo na base de dados, "tem espinhos", "tem aroma forte", "as folhas são compostas", é uma escolha de modelo. Quanto mais a gente codifica, mais a chave fica precisa. Mas a gente também perde a riqueza de uma chave escrita por um especialista, com nuance, com "geralmente", com "exceto em altitude alta". Esse trade-off é o mesmo que vocês discutem em qualquer trabalho de digitalização de coleções biológicas.

---

## Encerramento (8:30 a 9:00)

Resumindo em uma frase. O Herbário Vivo é uma chave taxonômica que escolhe a próxima pergunta por ganho de informação, em cima de uma base de quarenta espécies medicinais de Minas Gerais com curadoria de fontes.

A proposta é essa. Pega o celular. O link está aí no slide. Pensa numa planta que você conhece e tenta confundir o app. Vê se ele acerta, vê em qual pergunta você quase enganou ele, e se quiser depois a gente compara as fichas com a literatura.

Muito obrigado. Eu fico aqui pra perguntas.

---

## Apêndice. Referências citadas

Esse roteiro menciona quatro materiais. Em ordem de aparecimento:

- **Shannon, C. E. (1948). A Mathematical Theory of Communication.** A fonte do conceito de entropia usado no algoritmo. Bell System Technical Journal.
- **Brasil, Ministério da Saúde (2021). Informações Sistematizadas da RENISUS para Stryphnodendron adstringens.** Documento de referência usado na ficha do Barbatimão dentro do app.
- **Souza-Moreira, T. M., Salgado, H. R. N., Pietro, R. C. L. R. (2018). Stryphnodendron Species Known as Barbatimão: A Comprehensive Report.** Molecules, 23(4):910. Revisão sobre taninos do barbatimão.
- **Quinlan, J. R. (1986). Induction of Decision Trees.** Machine Learning, 1, 81-106. O artigo clássico de árvores de decisão por ganho de informação, que é a mesma lógica usada aqui em modo interativo.

A bibliografia completa do projeto, com mais de cinquenta referências cobrindo as quarenta espécies, está na tela "Referências" dentro do app.

---

## Notas para o palestrante

- O link do app no projetor é o GitHub Pages do repositório. Tenha o QR code já gerado no slide de demo, pra galera abrir no celular ao mesmo tempo. Roda offline depois de carregar.
- Se a internet falhar e a demo cair, tenha um screenshot da tela de pergunta, do "Não sei", e do resultado. Conta a mesma história só com as imagens.
- Se sobrar tempo no Q&A, três perguntas previsíveis: "como vocês validaram os dados?" (referências por espécie na tela de Referências), "ele funciona pra qualquer planta brasileira?" (não, só as quarenta da base de MG, mas a engine é genérica), "como entra fitoquímica?" (campo `classesQuimicas` no JSON, virou pergunta boolean automaticamente).
