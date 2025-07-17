
import { test, expect } from '@playwright/test'

import { getLoginPage } from '../support/pages/LoginPage'

import { getDashPage } from '../support/pages/DashPage'

import { getToast } from '../support/pages/components/Toast';


test('deve logar com sucesso', async ({ page }) => {

    const LoginPage = getLoginPage(page)
    const DashPage = getDashPage(page)
    const Toast = getToast(page)

    const user = {
        name: 'Fernando',
        username: 'papito',
        password: 'pwd123'
    }

    await LoginPage.open()

    await LoginPage.submit(user.username, user.password)

    await expect(DashPage.welcome()).toContainText(`Olá, ${user.name}! 👋`)
    await expect(Toast.element()).toContainText('Login realizado com sucesso!')
    await expect(Toast.element()).toContainText('Bem-vindo de volta ao Linkaí.')
});



test('não deve logar com senha incorreta', async ({ page }) => {

    const LoginPage = getLoginPage(page)
    const Toast = getToast(page)

    const user = {
        name: 'Fernando',
        username: 'papito',
        password: '123456'
    }

    await LoginPage.open()

    await LoginPage.submit(user.username, user.password)


    await expect(Toast.element()).toContainText('Oops!')
    await expect(Toast.element()).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')

});


test('não deve logar com usuário não cadastrado', async ({ page }) => {

    const LoginPage = getLoginPage(page)
    const Toast = getToast(page)

    const user = {
        name: 'Fernando',
        username: 'not-found',
        password: '123456'
    }

    await LoginPage.open()

    await LoginPage.submit(user.username, user.password)


    await expect(Toast.element()).toContainText('Oops!')
    await expect(Toast.element()).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')

});


test('não deve logar quando não informo nenhum dos campos', async ({ page }) => {

    const LoginPage = getLoginPage(page)
    const Toast = getToast(page)

    const user = {
        name: 'Fernando',
        username: '',
        password: ''
    }

    await LoginPage.open()

    await LoginPage.submit(user.username, user.password)


    await expect(Toast.element()).toContainText('Campos obrigatórios')
    await expect(Toast.element()).toContainText('Por favor, preencha todos os campos.')

});

test('não deve logar quando não informo um usuário', async ({ page }) => {

    const LoginPage = getLoginPage(page)
    const Toast = getToast(page)

    const user = {
        name: 'Fernando',
        username: '',
        password: 'pwd123'
    }

    await LoginPage.open()

    await LoginPage.submit(user.username, user.password)


    await expect(Toast.element()).toContainText('Campos obrigatórios')
    await expect(Toast.element()).toContainText('Por favor, preencha todos os campos.')

});

test('não deve logar quando não informo uma senha', async ({ page }) => {

    const LoginPage = getLoginPage(page)
    const Toast = getToast(page)

    const user = {
        name: 'Fernando',
        username: 'papito',
        password: ''
    }

    await LoginPage.open()

    await LoginPage.submit(user.username, user.password)


    await expect(Toast.element()).toContainText('Campos obrigatórios')
    await expect(Toast.element()).toContainText('Por favor, preencha todos os campos.')

});