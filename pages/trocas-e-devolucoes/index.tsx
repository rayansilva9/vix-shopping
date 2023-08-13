import React from 'react'

const Trocas_e_devolucoes: React.FC = () => {
  return (
    <>
      <div className="bg-zinc-100 min-w-screen min-h-screen px-3 py-4">
        <div className=" px-3 py-4 rounded-lg lg:w-[700px] mx-auto">
          <h1 className="text-gray-800 text-xl text-center mt-5 mb-7 font-medium leading-8">Política de Trocas e Devoluções</h1>
          <p className="mb-6 text-gray-600  text-sm leading-7">
            Na Loja Vix, queremos garantir sua satisfação total com nossos produtos. Se
            por algum motivo você não estiver satisfeito com sua compra, estamos aqui para
            ajudar com nossa política de trocas e devoluções.
          </p>
          <h2 className="text-gray-600  font-medium text-lg leading-7">Trocas</h2>
          <p className="text-gray-600  text-sm leading-7 mb-4">
            Aceitamos trocas de produtos dentro de 30 dias após a data da compra. O
            produto deve estar em perfeito estado, na embalagem original e com todas as
            etiquetas intactas. Entre em contato com nossa equipe de atendimento ao
            cliente para iniciar o processo de troca.
          </p>
          <h2 className="text-gray-600  font-medium text-lg leading-7">Devoluções</h2>
          <p className="text-gray-600  text-sm leading-7 mb-4">
            Caso deseje devolver um produto, você tem até 14 dias a partir da data da
            compra para fazê-lo. O produto deve estar em condições originais, sem uso, com
            todas as embalagens e etiquetas. Após recebermos o produto e aprovado o
            estado, faremos o reembolso do valor pago.
          </p>
          <h2 className="text-gray-600  font-medium text-lg leading-7">Condições Gerais</h2>
          <p className="text-gray-600  text-sm leading-7 mb-4">
            - Não aceitamos trocas ou devoluções de produtos personalizados ou em
            promoção;
            <br />
            - O frete de retorno em casos de trocas ou devoluções é de responsabilidade do
            cliente, a menos que o produto esteja com defeito ou tenha sido enviado
            incorretamente;
            <br />- Em casos de produtos defeituosos, entre em contato conosco o mais
            rápido possível para resolvermos a situação.
          </p>
          <p className="text-gray-600  text-sm leading-7 mb-4">
            Estamos comprometidos em proporcionar a melhor experiência de compra. Se você
            tiver alguma dúvida ou precisar de assistência, não hesite em entrar em
            contato com nossa equipe de suporte.
          </p>
        </div>
      </div>
    </>
  )
}

export default Trocas_e_devolucoes
