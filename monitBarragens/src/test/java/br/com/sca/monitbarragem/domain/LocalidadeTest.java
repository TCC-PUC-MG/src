package br.com.sca.monitbarragem.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.sca.monitbarragem.web.rest.TestUtil;

public class LocalidadeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Localidade.class);
        Localidade localidade1 = new Localidade();
        localidade1.setId("id1");
        Localidade localidade2 = new Localidade();
        localidade2.setId(localidade1.getId());
        assertThat(localidade1).isEqualTo(localidade2);
        localidade2.setId("id2");
        assertThat(localidade1).isNotEqualTo(localidade2);
        localidade1.setId(null);
        assertThat(localidade1).isNotEqualTo(localidade2);
    }
}
