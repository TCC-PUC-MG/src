package br.com.sca.monitbarragem.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.sca.monitbarragem.web.rest.TestUtil;

public class BarragemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Barragem.class);
        Barragem barragem1 = new Barragem();
        barragem1.setId("id1");
        Barragem barragem2 = new Barragem();
        barragem2.setId(barragem1.getId());
        assertThat(barragem1).isEqualTo(barragem2);
        barragem2.setId("id2");
        assertThat(barragem1).isNotEqualTo(barragem2);
        barragem1.setId(null);
        assertThat(barragem1).isNotEqualTo(barragem2);
    }
}
