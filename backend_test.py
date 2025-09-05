#!/usr/bin/env python3
"""
Teste completo do chatbot com IA real do portfólio
Testa todos os cenários especificados na review request
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime

# URL do backend a partir do frontend/.env
BACKEND_URL = "https://prompt-portfolio-bot.preview.emergentagent.com/api"

class ChatbotTester:
    def __init__(self):
        self.session_id = None
        self.test_results = []
        
    async def log_test(self, test_name: str, success: bool, details: str, response_data=None):
        """Log dos resultados dos testes"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        status = "✅ PASSOU" if success else "❌ FALHOU"
        print(f"{status} - {test_name}")
        print(f"   Detalhes: {details}")
        if response_data:
            print(f"   Dados: {json.dumps(response_data, indent=2, ensure_ascii=False)}")
        print("-" * 80)

    async def test_basic_chat_endpoint(self):
        """Teste 1: Teste básico do endpoint de chat"""
        test_name = "Teste básico do endpoint de chat"
        
        try:
            async with aiohttp.ClientSession() as session:
                payload = {
                    "message": "Olá, me conte sobre sua experiência"
                }
                
                async with session.post(f"{BACKEND_URL}/chat", json=payload) as response:
                    if response.status != 200:
                        await self.log_test(test_name, False, f"Status HTTP {response.status}")
                        return False
                    
                    data = await response.json()
                    
                    # Verificações
                    checks = []
                    
                    # Verificar se retorna resposta
                    if "response" in data and data["response"]:
                        checks.append("✓ Retorna resposta")
                    else:
                        checks.append("✗ Não retorna resposta")
                    
                    # Verificar se cria session_id
                    if "session_id" in data and data["session_id"]:
                        self.session_id = data["session_id"]
                        checks.append("✓ Cria session_id")
                    else:
                        checks.append("✗ Não cria session_id")
                    
                    # Verificar se resposta é em português
                    response_text = data.get("response", "").lower()
                    portuguese_indicators = ["desenvolvedor", "programação", "projetos", "tecnologias", "experiência"]
                    has_portuguese = any(word in response_text for word in portuguese_indicators)
                    
                    if has_portuguese:
                        checks.append("✓ Resposta em português")
                    else:
                        checks.append("✗ Resposta não parece estar em português")
                    
                    # Verificar se resposta é contextual sobre o desenvolvedor
                    dev_context = ["desenvolvedor", "programador", "projetos", "html", "css", "javascript", "devclub"]
                    has_context = any(word in response_text for word in dev_context)
                    
                    if has_context:
                        checks.append("✓ Resposta contextual sobre desenvolvedor")
                    else:
                        checks.append("✗ Resposta não é contextual sobre desenvolvedor")
                    
                    success = all("✓" in check for check in checks)
                    details = " | ".join(checks)
                    
                    await self.log_test(test_name, success, details, data)
                    return success
                    
        except Exception as e:
            await self.log_test(test_name, False, f"Erro na requisição: {str(e)}")
            return False

    async def test_continued_conversation(self):
        """Teste 2: Teste de conversa continuada"""
        test_name = "Teste de conversa continuada"
        
        if not self.session_id:
            await self.log_test(test_name, False, "Session ID não disponível do teste anterior")
            return False
        
        try:
            async with aiohttp.ClientSession() as session:
                payload = {
                    "message": "Fale sobre o jogo Embaralhado",
                    "session_id": self.session_id
                }
                
                async with session.post(f"{BACKEND_URL}/chat", json=payload) as response:
                    if response.status != 200:
                        await self.log_test(test_name, False, f"Status HTTP {response.status}")
                        return False
                    
                    data = await response.json()
                    
                    # Verificações
                    checks = []
                    
                    # Verificar se mantém o mesmo session_id
                    if data.get("session_id") == self.session_id:
                        checks.append("✓ Mantém contexto da sessão")
                    else:
                        checks.append("✗ Não mantém contexto da sessão")
                    
                    # Verificar se resposta é específica sobre o projeto Embaralhado
                    response_text = data.get("response", "").lower()
                    embaralhado_keywords = ["embaralhado", "quebra-cabeça", "imagem", "cronômetro", "música", "dificuldade", "concentração"]
                    has_embaralhado_info = any(word in response_text for word in embaralhado_keywords)
                    
                    if has_embaralhado_info:
                        checks.append("✓ Resposta específica sobre jogo Embaralhado")
                    else:
                        checks.append("✗ Resposta não é específica sobre jogo Embaralhado")
                    
                    success = all("✓" in check for check in checks)
                    details = " | ".join(checks)
                    
                    await self.log_test(test_name, success, details, data)
                    return success
                    
        except Exception as e:
            await self.log_test(test_name, False, f"Erro na requisição: {str(e)}")
            return False

    async def test_session_persistence(self):
        """Teste 3: Teste de persistência de sessão"""
        test_name = "Teste de persistência de sessão"
        
        if not self.session_id:
            await self.log_test(test_name, False, "Session ID não disponível")
            return False
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(f"{BACKEND_URL}/chat/sessions/{self.session_id}") as response:
                    if response.status != 200:
                        await self.log_test(test_name, False, f"Status HTTP {response.status}")
                        return False
                    
                    data = await response.json()
                    
                    # Verificações
                    checks = []
                    
                    # Verificar se retorna session_id correto
                    if data.get("session_id") == self.session_id:
                        checks.append("✓ Session ID correto")
                    else:
                        checks.append("✗ Session ID incorreto")
                    
                    # Verificar se retorna histórico de mensagens
                    messages = data.get("messages", [])
                    if len(messages) >= 4:  # Pelo menos 2 perguntas e 2 respostas
                        checks.append("✓ Histórico completo presente")
                    else:
                        checks.append(f"✗ Histórico incompleto ({len(messages)} mensagens)")
                    
                    # Verificar estrutura das mensagens
                    valid_structure = True
                    for msg in messages:
                        if not all(key in msg for key in ["role", "content", "timestamp"]):
                            valid_structure = False
                            break
                        if msg["role"] not in ["user", "assistant"]:
                            valid_structure = False
                            break
                    
                    if valid_structure:
                        checks.append("✓ Estrutura das mensagens válida")
                    else:
                        checks.append("✗ Estrutura das mensagens inválida")
                    
                    success = all("✓" in check for check in checks)
                    details = " | ".join(checks)
                    
                    await self.log_test(test_name, success, details, data)
                    return success
                    
        except Exception as e:
            await self.log_test(test_name, False, f"Erro na requisição: {str(e)}")
            return False

    async def test_different_questions(self):
        """Teste 4: Teste de diferentes perguntas"""
        test_name = "Teste de diferentes perguntas"
        
        questions = [
            "O que te motivou a programar?",
            "Quais são seus objetivos?",
            "Conte sobre o site de turismo acessível"
        ]
        
        all_success = True
        question_results = []
        
        for i, question in enumerate(questions):
            try:
                async with aiohttp.ClientSession() as session:
                    payload = {
                        "message": question,
                        "session_id": self.session_id
                    }
                    
                    async with session.post(f"{BACKEND_URL}/chat", json=payload) as response:
                        if response.status != 200:
                            question_results.append(f"Pergunta {i+1}: Status HTTP {response.status}")
                            all_success = False
                            continue
                        
                        data = await response.json()
                        response_text = data.get("response", "").lower()
                        
                        # Verificar conteúdo específico para cada pergunta
                        if i == 0:  # Motivação
                            keywords = ["paixão", "código", "visual", "funcional", "lógica", "transformar"]
                            has_content = any(word in response_text for word in keywords)
                            question_results.append(f"Pergunta 1 (motivação): {'✓' if has_content else '✗'}")
                        
                        elif i == 1:  # Objetivos
                            keywords = ["programador", "equipes", "diferença", "produtividade", "impacto"]
                            has_content = any(word in response_text for word in keywords)
                            question_results.append(f"Pergunta 2 (objetivos): {'✓' if has_content else '✗'}")
                        
                        elif i == 2:  # Turismo acessível
                            keywords = ["turismo", "acessível", "acessibilidade", "rampas", "braile", "inclusão", "especiais"]
                            has_content = any(word in response_text for word in keywords)
                            question_results.append(f"Pergunta 3 (turismo): {'✓' if has_content else '✗'}")
                        
                        if not has_content:
                            all_success = False
                            
            except Exception as e:
                question_results.append(f"Pergunta {i+1}: Erro - {str(e)}")
                all_success = False
        
        details = " | ".join(question_results)
        await self.log_test(test_name, all_success, details)
        return all_success

    async def test_health_check(self):
        """Teste adicional: Health check do backend"""
        test_name = "Health check do backend"
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(f"{BACKEND_URL}/") as response:
                    if response.status == 200:
                        data = await response.json()
                        success = data.get("message") == "Hello World"
                        details = f"Status: {response.status}, Resposta: {data}"
                        await self.log_test(test_name, success, details, data)
                        return success
                    else:
                        await self.log_test(test_name, False, f"Status HTTP {response.status}")
                        return False
        except Exception as e:
            await self.log_test(test_name, False, f"Erro na requisição: {str(e)}")
            return False

    async def run_all_tests(self):
        """Executa todos os testes na ordem correta"""
        print("=" * 80)
        print("INICIANDO TESTES DO CHATBOT COM IA REAL")
        print("=" * 80)
        
        # Teste de health check primeiro
        await self.test_health_check()
        
        # Testes principais na ordem
        test1_success = await self.test_basic_chat_endpoint()
        test2_success = await self.test_continued_conversation()
        test3_success = await self.test_session_persistence()
        test4_success = await self.test_different_questions()
        
        # Resumo final
        print("\n" + "=" * 80)
        print("RESUMO DOS TESTES")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        
        print(f"Total de testes: {total_tests}")
        print(f"Testes aprovados: {passed_tests}")
        print(f"Testes falharam: {total_tests - passed_tests}")
        print(f"Taxa de sucesso: {(passed_tests/total_tests)*100:.1f}%")
        
        print("\nDetalhes por teste:")
        for result in self.test_results:
            status = "✅" if result["success"] else "❌"
            print(f"{status} {result['test']}")
        
        # Critérios de sucesso da review request
        print("\n" + "=" * 80)
        print("VERIFICAÇÃO DOS CRITÉRIOS DE SUCESSO")
        print("=" * 80)
        
        criteria_met = []
        
        # Respostas em português brasileiro
        portuguese_tests = [r for r in self.test_results if "português" in r["details"]]
        if any("✓" in r["details"] for r in portuguese_tests):
            criteria_met.append("✅ Respostas em português brasileiro")
        else:
            criteria_met.append("❌ Respostas em português brasileiro")
        
        # Respostas contextuais
        context_tests = [r for r in self.test_results if "contextual" in r["details"]]
        if any("✓" in r["details"] for r in context_tests):
            criteria_met.append("✅ Respostas contextuais sobre o desenvolvedor")
        else:
            criteria_met.append("❌ Respostas contextuais sobre o desenvolvedor")
        
        # Persistência de sessões
        session_tests = [r for r in self.test_results if "persistência" in r["test"].lower()]
        if any(r["success"] for r in session_tests):
            criteria_met.append("✅ Sessions persistem no MongoDB")
        else:
            criteria_met.append("❌ Sessions persistem no MongoDB")
        
        # Sem erros 500
        no_500_errors = all(r["success"] or "500" not in r["details"] for r in self.test_results)
        if no_500_errors:
            criteria_met.append("✅ Sem erros 500")
        else:
            criteria_met.append("❌ Erros 500 encontrados")
        
        for criterion in criteria_met:
            print(criterion)
        
        overall_success = all("✅" in criterion for criterion in criteria_met)
        
        print(f"\n{'🎉 TODOS OS CRITÉRIOS ATENDIDOS!' if overall_success else '⚠️  ALGUNS CRITÉRIOS NÃO FORAM ATENDIDOS'}")
        
        return overall_success

async def main():
    """Função principal"""
    tester = ChatbotTester()
    success = await tester.run_all_tests()
    
    # Salvar resultados em arquivo
    with open("/app/test_results_chatbot.json", "w", encoding="utf-8") as f:
        json.dump(tester.test_results, f, indent=2, ensure_ascii=False)
    
    print(f"\nResultados salvos em: /app/test_results_chatbot.json")
    return success

if __name__ == "__main__":
    asyncio.run(main())