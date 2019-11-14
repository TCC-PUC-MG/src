package br.com.sca.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.sca.gateway.web.rest.TestUtil;

public class RiscoBarragemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RiscoBarragem.class);
        RiscoBarragem riscoBarragem1 = new RiscoBarragem();
        riscoBarragem1.setId("id1");
        RiscoBarragem riscoBarragem2 = new RiscoBarragem();
        riscoBarragem2.setId(riscoBarragem1.getId());
        assertThat(riscoBarragem1).isEqualTo(riscoBarragem2);
        riscoBarragem2.setId("id2");
        assertThat(riscoBarragem1).isNotEqualTo(riscoBarragem2);
        riscoBarragem1.setId(null);
        assertThat(riscoBarragem1).isNotEqualTo(riscoBarragem2);
    }
}
