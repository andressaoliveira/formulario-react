import React, { Component } from "react";
import FormularioService from "../../Infrastructure/Service/Formulario";

import './Formulario.css';

const formularioService = new FormularioService();

class Popover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            telefone: "",
            comoConheceu: "Tv",
            possuiRedeSocial: false,
            redesSociais: [
                { facebook: false },
                { linkedin: false },
                { instagram: false },

            ],
            desabilitarBotao: false
        };
    }

    aoAlterarNome(nome) {
        this.setState({ nome: nome })
    }

    aoAlterarTelefone(telefone) {
        const comMascara = this.mascaraTelefone(telefone);
        this.setState({ telefone: comMascara })
    }

    prepararValorParaMascara = (valor) => {
        if (!valor) return '';
        return valor.replace(/\D/g, '').substring(0, valor.length);
    };

    mascaraTelefone = (telefone) => {
        const numero = this.prepararValorParaMascara(telefone);
        let telefoneComMascara = '';

        switch (numero.length) {
            case 0:
                break;
            case 1:
                telefoneComMascara = numero.replace(/(\d{1})/, '$1'); break;
            case 2:
                telefoneComMascara = numero.replace(/(\d{2})/, '$1'); break;
            case 3:
                telefoneComMascara = numero.replace(/(\d{2})(\d{1})/, '$1 - $2'); break;
            case 4:
                telefoneComMascara = numero.replace(/(\d{2})(\d{2})/, '$1 - $2'); break;
            case 5:
                telefoneComMascara = numero.replace(/(\d{2})(\d{3})/, '$1 - $2'); break;
            case 6:
                telefoneComMascara = numero.replace(/(\d{2})(\d{4})/, '$1 - $2'); break;
            case 7:
                telefoneComMascara = numero.replace(/(\d{2})(\d{4})(\d{1})/, '$1 - $2 $3'); break;
            case 8:
                telefoneComMascara = numero.replace(/(\d{2})(\d{4})(\d{2})/, '$1 - $2 $3'); break;
            case 9:
                telefoneComMascara = numero.replace(/(\d{2})(\d{4})(\d{3})/, '$1 - $2 $3'); break;
            case 10:
                telefoneComMascara = numero.replace(/(\d{2})(\d{4})(\d{4})/, '$1 - $2 $3'); break;
            default:
                telefoneComMascara = this.mascaraTelefone(numero.substring(0, 10)); break;
        }
        return telefoneComMascara;
    };

    aoAlterarComoConheceu(comoConheceu) {
        this.setState({ comoConheceu: comoConheceu })
    }

    aoAlterarPossuiRedeSocial() {
        this.setState({ possuiRedeSocial: !this.state.possuiRedeSocial })
    }

    aoSelecionarRedeSocialFacebook() {
        const { redesSociais } = this.state;
        this.setState({
            redesSociais:
            {
                ...redesSociais,
                facebook: !redesSociais.facebook
            }
        })
    }


    aoSelecionarRedeSocialLinkedin() {
        const { redesSociais } = this.state;
        this.setState({
            redesSociais:
            {
                ...redesSociais,
                linkedin: !redesSociais.linkedin
            }
        })
    }


    aoSelecionarRedeSocialInstagram() {
        const { redesSociais } = this.state;
        this.setState({
            redesSociais:
            {
                ...redesSociais,
                instagram: !redesSociais.instagram
            }
        })
    }

    obterPrimeiroSobrenome = (nome) => {
        for (let i = 1; i < nome.length; i++) {
            if (nome[i] !== "")
                return nome[i];
        }
    }

    validarNome = () => {
        const { nome } = this.state;
        var nomeSobrenome = nome.split(" ", nome.length);
        var primeiroNome = nomeSobrenome[0];
        var sobrenome = this.obterPrimeiroSobrenome(nomeSobrenome);

        if (!primeiroNome || !sobrenome) {
            alert('Digite nome e sobrenome de forma correta')
            return false;
        }
        return true;
    }
    validarTelefone() {
        const { telefone } = this.state;
        if (telefone.length !== 14) {
            alert('Digite um telefone correto')
            return false;
        }
        return true
    }

    validarDados = () => {
        if (this.validarNome() && this.validarTelefone()) {
            this.enviarDados();
        }
    }
    enviarDados = () => {
        const { nome, telefone, comoConheceu, possuiRedeSocial, redesSociais } = this.state;
        const retornoRedesSociais = [];
        if (possuiRedeSocial) {
            if (redesSociais.facebook) {
                retornoRedesSociais.push('Facebook')
            }
            if (redesSociais.instagram) {
                retornoRedesSociais.push('Instagram')
            }
            if (redesSociais.linkedin) {
                retornoRedesSociais.push('LinkedIn')
            }
        }
        const dados = {
            nome,
            telefone,
            comoConheceu,
            redesSociais: retornoRedesSociais
        }

        formularioService.enviarFormulario(dados);
        this.setState({ desabilitarBotao: true })

    }

    render() {
        const { nome, telefone, possuiRedeSocial, redesSociais, desabilitarBotao } = this.state;
        return (
            <div className="formulario">
                <div className="item nome">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" value={nome} required
                        onChange={(event) => this.aoAlterarNome(event.target.value)} />
                </div>
                <div className="item telefone">
                    <label for="telefone">Telefone:</label>
                    <input type="text" id="telefone" value={this.mascaraTelefone(telefone)}
                        onChange={(event) => this.aoAlterarTelefone(event.target.value)} />
                </div>
                <div className="item como-conheceu">
                    <label for="como-conheceu">Como nos conheceu:</label>
                    <select id="como-conheceu" onChange={(event) => this.aoAlterarComoConheceu(event.target.value)}>
                        <option>Tv</option>
                        <option>Internet</option>
                        <option>Outros</option>
                    </select>
                </div>
                <div className="item rede-social">
                    <label for="possui-rede-social">Possui rede social:</label>
                    <div className="item rede-social opcoes">
                        <input type="radio" name="rede-social" checked={possuiRedeSocial}
                            onChange={() => this.aoAlterarPossuiRedeSocial()} />Sim
                        <input type="radio" name="rede-social" checked={!possuiRedeSocial}
                            onChange={() => this.aoAlterarPossuiRedeSocial()} />Não
                    </div>
                </div>
                {!possuiRedeSocial ? null :
                    <div className="item rede-social-opcoes">
                        <label for="msg">Quais:</label>
                        <div className="item rede-social-opcoes check">
                            <input type="checkbox" id="facebook" name="facebook" checked={redesSociais.facebook}
                                onChange={() => this.aoSelecionarRedeSocialFacebook()} />
                            <label for="facebook">Facebook</label>

                            <input type="checkbox" id="linkedin" name="linkedin" checked={redesSociais.linkedin}
                                onChange={() => this.aoSelecionarRedeSocialLinkedin()} />
                            <label for="linkedin">LinkedIn</label>

                            <input type="checkbox" id="instagram" name="instagram" checked={redesSociais.instagram}
                                onChange={() => this.aoSelecionarRedeSocialInstagram()} />
                            <label for="instagram">Instagram</label>
                        </div>
                    </div>
                }
                <div className="botao-enviar">
                    <button
                        onClick={this.validarDados}
                        disabled={desabilitarBotao}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        );
    }
}

export default Popover;
