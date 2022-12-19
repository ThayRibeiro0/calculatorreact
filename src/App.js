// Retorna o estado de um valor e atualiza a funcao
import { useState } from "react";

function App() {
  // cria constantes de calculo e configuracao do calculo que sao iguais a esse usestate importado que sera igual a uma string
  const [calc, setCalc] = useState("");
  // e traz um resultado e configuracao dele e que tambem sera retornado e atualizado sendo igual a uma string
  const [result, setResult] = useState("");

  // definindo os operadores 
  const ops = ["/", "*", "+", "-", "."];

  // os botoes todos representam um valor e quando clicado neles baisicamente ira aplicar para esse calc
  const updateCalc = (value) => {
    // includes define se um array incluindo um certo elemento, retornando verdadeiro ou falso como apropriado
    // se igual se o ultimo valor e um operador e o calculo nao tem nada 
    if (
        ops.includes(value) && calc === '' ||
        // ou o operador tem o valor e um operador e o ultimo valor foi tambem um operador 
        ops.includes(value) && ops.includes(calc.slice(-1)
        )
    ) {
      // retorna e nao faz nada limitando os operadores no display e previne adicionar carregamento de um asterisco mesmo com o ponto vc nao pode adicionar depois de uma substracao
        return;
    }

    setCalc(calc + value);

    // se o ultimo item nao for um valor ou nao um operador nos iremos dizer, configure o resultado, avaliacao que e basicamente qualquer string que passe aqui sera avaliada se 5 + 5 ira dar 10 fazendo os calculos
    if (!ops.includes(value)) {
      // calc e o atual valor que nao sera atualizado ate o proximo quadro(frame) ou a proxima chamada transformando tudo para string
        setResult(eval(calc + value).toString());
    }
  };

  const createDigits = () => {
    const digits = [];

    {/* cada clique nos onclicks ira ativa a funcao criada e aplicar a funcao updateCalc */}
    for (let i = 1; i < 10; i++) {
      digits.push(
        //cria elementos que no caso sao os botoes de 1 a 9 e retorna na tela eles sendo a chave o valor de i que fica representado na funcao i = 1 e menor que 10 que funcionara com o click
        // aqui preciso fazer isso para dizer que i sera string para nao ter problemas mais tarde, passando os dados para a funcao updateCalc e tranformando em string
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }

    return digits;
  }

  // essa constante e igual a uma funcao em que a configuracao do calcudo feito ele ira para o valor e ativamente retornar ele transformado em string e dentro do botao = traz essa funcao para ativar o uso dele em que mostrara o resultado do calculo
  const calculate = () => {
    setCalc(eval(calc).toString());
  }

  // se a funcao calc for igual a nada so retorna e faz nada 
  const deleteLast = () => {
    if (calc == ''){
        return;
    }
    // se a constante valor for igual a calc que trara uma sequencia de string ai diminui -1
    const value = calc.slice(0, -1);
    
    setCalc(value);
  }


  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {/* display */}
          {/* os botoes todos representam um valor e quando clicado neles baisicamente ira aplicar para esse calc e o se o resultado for nada ficara 0 */}
          {result ? <span>({result})</span> : '' }&nbsp;
          {/* &nbsp da um espaco entre o valor de resultado e os valores digitados no display */}
          {/* o valor de result interno sera dado atraves do calculo feito e avaliado no updateCalc */}
          {calc || "0"}
        </div>

        <div className="operators">
          {/* operadores */}
          {/* cada clique ira ativa a funcao criada e aplicar a funcao updateCalc */}
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("-")}>-</button>
        {/* para ativar o delete */}
          <button onClick={deleteLast}>DEL</button>
        </div>

        <div className="digits">
          {/* digitos */}
          {createDigits()}
          {/* cada clique ira ativa a funcao criada e aplicar a funcao updateCalc */}
          <button onClick={() => updateCalc(".")}>.</button>
          <button onClick={() => updateCalc("0")}>0</button>
          {/* resultado da funcao calculate */}
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
