package br.com.sca.monitbarragem.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.sca.monitbarragem.web.rest.TestUtil;

public class MinaExtracaoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MinaExtracao.class);
        MinaExtracao minaExtracao1 = new MinaExtracao();
        minaExtracao1.setId("id1");
        MinaExtracao minaExtracao2 = new MinaExtracao();
        minaExtracao2.setId(minaExtracao1.getId());
        assertThat(minaExtracao1).isEqualTo(minaExtracao2);
        minaExtracao2.setId("id2");
        assertThat(minaExtracao1).isNotEqualTo(minaExtracao2);
        minaExtracao1.setId(null);
        assertThat(minaExtracao1).isNotEqualTo(minaExtracao2);
    }
}
