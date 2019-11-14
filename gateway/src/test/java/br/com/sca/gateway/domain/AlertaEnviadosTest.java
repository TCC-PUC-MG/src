package br.com.sca.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.sca.gateway.web.rest.TestUtil;

public class AlertaEnviadosTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlertaEnviados.class);
        AlertaEnviados alertaEnviados1 = new AlertaEnviados();
        alertaEnviados1.setId("id1");
        AlertaEnviados alertaEnviados2 = new AlertaEnviados();
        alertaEnviados2.setId(alertaEnviados1.getId());
        assertThat(alertaEnviados1).isEqualTo(alertaEnviados2);
        alertaEnviados2.setId("id2");
        assertThat(alertaEnviados1).isNotEqualTo(alertaEnviados2);
        alertaEnviados1.setId(null);
        assertThat(alertaEnviados1).isNotEqualTo(alertaEnviados2);
    }
}
