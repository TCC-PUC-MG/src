package br.com.sca.monitbarragem.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.sca.monitbarragem.web.rest.TestUtil;

public class EventoRiscoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EventoRisco.class);
        EventoRisco eventoRisco1 = new EventoRisco();
        eventoRisco1.setId("id1");
        EventoRisco eventoRisco2 = new EventoRisco();
        eventoRisco2.setId(eventoRisco1.getId());
        assertThat(eventoRisco1).isEqualTo(eventoRisco2);
        eventoRisco2.setId("id2");
        assertThat(eventoRisco1).isNotEqualTo(eventoRisco2);
        eventoRisco1.setId(null);
        assertThat(eventoRisco1).isNotEqualTo(eventoRisco2);
    }
}
