import { useEffect, useState } from 'react'
import axios from 'axios'

export const useFetchIp = () => {
  const [ip, setIp] = useState(null)

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get('https://api.ipify.org/?format=json')
        localStorage.setItem('@zixpay-user-ip-address', response.data.ip)
        setIp(response.data.ip)
      } catch (error: unknown) {
        console.error('Erro ao obter o endereço IP:', error)
      }
    }

    fetchIpAddress()
  }, [])

  return ip
}
