const EMAILJS_PUBLIC_KEY  = "u4PVNhc24e0kZg7E0";
const EMAILJS_SERVICE_ID  = "service_0ryjinq";
const EMAILJS_TEMPLATE_ID = "template_m29hfv4";

(function () {
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.onload = function () { emailjs.init(EMAILJS_PUBLIC_KEY); };
    document.head.appendChild(s);
})();

function enviarFormulario() {
    var nome      = document.getElementById("f-nome").value.trim();
    var email     = document.getElementById("f-email").value.trim();
    var interesse = document.getElementById("f-interesse").value.trim();
    var mensagem  = document.getElementById("f-mensagem").value.trim();
    var termos    = document.getElementById("f-termos").checked;
    var statusEl  = document.getElementById("status-msg");
    var btn       = document.getElementById("btn-enviar");

    if (!nome || !email || !mensagem) {
        statusEl.textContent = "Preencha nome, e-mail e mensagem.";
        statusEl.className = "status-err";
        return;
    }
    if (!termos) {
        statusEl.textContent = "Aceite os termos para continuar.";
        statusEl.className = "status-err";
        return;
    }

    btn.disabled = true;
    btn.textContent = "Enviando…";
    statusEl.textContent = "";

    var templateParams = {
        from_name:  nome,
        from_email: email,
        message:    mensagem
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function () {
            statusEl.textContent = "✅ Mensagem enviada com sucesso! Entrarei em contato em breve.";
            statusEl.className = "status-ok";
            btn.textContent = "Enviado!";
            document.getElementById("f-nome").value = "";
            document.getElementById("f-email").value = "";
            document.getElementById("f-interesse").value = "";
            document.getElementById("f-mensagem").value = "";
            document.getElementById("f-termos").checked = false;
        })
        .catch(function (err) {
            statusEl.textContent = "❌ Erro ao enviar. Tente novamente ou use o e-mail direto.";
            statusEl.className = "status-err";
            btn.disabled = false;
            btn.textContent = "Enviar";
            console.error(err);
        });
}
