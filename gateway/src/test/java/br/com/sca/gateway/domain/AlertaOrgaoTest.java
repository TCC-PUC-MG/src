package br.com.sca.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.sca.gateway.web.rest.TestUtil;

public class AlertaOrgaoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlertaOrgao.class);
        AlertaOrgao alertaOrgao1 = new AlertaOrgao();
        alertaOrgao1.setId("id1");
        AlertaOrgao alertaOrgao2 = new AlertaOrgao();
        alertaOrgao2.setId(alertaOrgao1.getId());
        assertThat(alertaOrgao1).isEqualTo(alertaOrgao2);
        alertaOrgao2.setId("id2");
        assertThat(alertaOrgao1).isNotEqualTo(alertaOrgao2);
        alertaOrgao1.setId(null);
        assertThat(alertaOrgao1).isNotEqualTo(alertaOrgao2);
    }
}
