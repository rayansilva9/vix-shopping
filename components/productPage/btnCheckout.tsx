import { memo } from "react"


type props = {
  priceId: string
  quantidade: number,
  variedade: string[]
  preço: number
}

function formatarMoeda(valor: number | string) {
  valor = valor + ''
  valor = parseInt(valor.replace(/[\D]+/g, ''))
  valor = valor + ''
  valor = valor.replace(/([0-9]{2})$/g, ',$1')

  if (valor.length > 6) {
    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
  }

  return valor
}

const BtnCheckout: React.FC<props> = ({ preço, priceId, quantidade, variedade }) => {
  return (
    <>
      <form
        method="post"
        action={`/api/checkout/${priceId
          }/${quantidade}/${variedade.join(', ')}`}
      >
        <div
          style={{ boxShadow: ' 0px -4px 15px -8px rgba(0,0,0,0.75)' }}
          className=" xl:hidden fixed bg-white bottom-0 w-full px-2 py-4"
        >
          <p className="text-base text-gray-600 font-bold xl:my-5 xl:text-[20px]">
            R${''}
            <span className="text-2xl xl:text-[30px]">
              {formatarMoeda(preço)}
            </span>
          </p>
          <p className="text-zinc-700 text-sm  mb-2">ou 12x sem juros</p>
          <button
            type="submit"
            className="w-full hover:bg-[#369e23] transition-colors py-3 bg-[#0BC86D] rounded-md text-lg text-white font-medium"
          >
            <p className="text-md">Compra Agora</p>
          </button>
        </div>
      </form>
    </>
  );
}

export default memo(BtnCheckout);