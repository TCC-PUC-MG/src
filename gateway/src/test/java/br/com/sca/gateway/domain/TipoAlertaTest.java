package br.com.sca.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.sca.gateway.web.rest.TestUtil;

public class TipoAlertaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoAlerta.class);
        TipoAlerta tipoAlerta1 = new TipoAlerta();
        tipoAlerta1.setId("id1");
        TipoAlerta tipoAlerta2 = new TipoAlerta();
        tipoAlerta2.setId(tipoAlerta1.getId());
        assertThat(tipoAlerta1).isEqualTo(tipoAlerta2);
        tipoAlerta2.setId("id2");
        assertThat(tipoAlerta1).isNotEqualTo(tipoAlerta2);
        tipoAlerta1.setId(null);
        assertThat(tipoAlerta1).isNotEqualTo(tipoAlerta2);
    }
}
