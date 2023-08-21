import React, { useContext } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select'
import { cn } from '../../lib/utils'
import { useTranslation } from 'react-i18next'
import { CurrencyContext } from '../../context/currencyContext'

type props = {
  textColor: string
}

const SelectLang: React.FC<props> = ({ textColor = 'text-white' }) => {
  const { t, i18n } = useTranslation()

  function CHANGE_LANG(lang: string) {
    i18n.changeLanguage(lang)
  }
  const { currency, setCurrency } = useContext(CurrencyContext)
  console.log(currency)
  return (
    <>
      <Select
        defaultValue="brl"
        onValueChange={e => setCurrency(e as 'brl' | 'usd' | 'eur')}
      >
        <SelectTrigger className={cn(`${textColor} text-xs`)}>
          <SelectValue placeholder="Moeda" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="brl">BRL</SelectItem>
          <SelectItem value="usd">USD</SelectItem>
          <SelectItem value="eur">EUR</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="pt" onValueChange={e => CHANGE_LANG(e)}>
        <SelectTrigger className={cn(`${textColor} text-xs`)}>
          <SelectValue placeholder="Idioma" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pt">Português</SelectItem>
          <SelectItem value="en">Inglês</SelectItem>
          <SelectItem value="es">Espanhol</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}

export default SelectLang
