import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { TouchableWithoutFeedback, Keyboard, Alert, Modal } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Button, TransactionTypeButton, CategorySelectButton, InputForm } from '@/components'
import { CategorySelect } from '../category-select'
import { Container, Header, Title, Form, Fields, TransactionsTypes } from './styles'
import { useAuth } from '@/hooks'

type FormData = {
  name: string
  amount: string
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
})

export function Register() {
  const { user } = useAuth()

  const [transactionType, setTransactionType] = useState('')
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false)

  const navigation = useNavigation()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  })
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const handleTransactionTypeSelect = (type: 'positive' | 'negative') => {
    setTransactionType(type)
  }

  const handleCloseSelectCategoryModal = () => {
    setIsOpenCategoryModal(false)
  }

  const handleOpenSelectCategoryModal = () => {
    setIsOpenCategoryModal(true)
  }

  const handleRegister = async (form: FormData) => {
    const dataKey = `@gofinances:transactions_user=${user.id}`

    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }
    try {
      const oldData = await AsyncStorage.getItem(dataKey)
      const currentData = oldData ? JSON.parse(oldData) : []

      const dataFormatted = JSON.stringify([...currentData, newTransaction])

      await AsyncStorage.setItem(dataKey, dataFormatted)

      reset()
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria',
      })
      navigation.navigate('Listagem')
    } catch (err) {
      console.log(err)
      Alert.alert('Não foi possível salvar')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionsTypes>
            <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />
            <Modal visible={isOpenCategoryModal}>
              <CategorySelect
                category={category}
                setCategory={setCategory}
                closeSelectCategory={handleCloseSelectCategoryModal}
              />
            </Modal>
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  )
}
